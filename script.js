var board = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
var max = 2;

//start game
initBoard();

document.onkeydown = checkKey;
function checkKey(e) {
    switch(e.keyCode) {
        case 37: move("left"); break;
        case 39: move("right"); break;
        case 38: move("up"); break;
        case 40: move("down"); break;
    }
    //37 left, 39 right, 38 up, 40 down
}

function initBoard() {
    //initialize the board when new game starts.
    board = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
    max = 2;
    for (var i = 2; i > 0; i--) {
        var x = parseInt(Math.random() * 4);
        var y = parseInt(Math.random() * 4);
        if (board[x][y] == 0) board[x][y] = 2;
        else i++;
    }
    draw();
}

//generate 2 or 4 after moving
function generateNewNumber() {
    var x = parseInt(Math.random() * 4);
    var y = parseInt(Math.random() * 4);
    var twoOrFour = Math.random() * 10;
    if (board[x][y] == 0) {
        if(twoOrFour < 8) board[x][y] = 2;
        else board[x][y] = 4;
    } else generateNewNumber();
}

function isAnyCellEmpty() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j] == 0) return true;
        }
    }
    return false;
}

//draw
function draw() {    
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = document.getElementById("board").rows[i].cells[j];
            paint(cell, board[i][j]);
        }
    }
    document.getElementById("goal").innerHTML = max * 2;
}

//move as the direction and add the numbers
function move(direction) {
    switch(direction) {
        case "left" : board = mergeLeft(board); break;
        case "right" : board = mergeRight(board); break;
        case "up" : board = rotate(mergeLeft(rotate(board, "left")), "right"); break;
        case "down" : board = rotate(mergeLeft(rotate(board, "right")), "left"); break;
    } 
    //if it is still empty, generate number.
    if(isAnyCellEmpty()) {
        generateNewNumber();
        draw(); 
    }
    if(checkGameOver()) {        
        alert("game over!");
        initBoard();
    } 
}

function mergeLeft(array) {
    var temp = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));

    for(var i = 0; i < 4; i++) {
        temp[i] = moveNumbersToLeft(array[i]);
        for(var j=0; j<3; j++) {
            if(temp[i][j] == temp[i][j+1]) {
                temp[i][j] = temp[i][j] * 2;
                if(temp[i][j]>max) {
                    max = temp[i][j]; 
                }
                temp[i][j+1] = 0;
                temp[i] = moveNumbersToLeft(temp[i]);
            }
        }        
    }
    return temp;
}

function mergeRight(array) {
    var temp = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
    for(var i = 0; i < 4; i++) {
        temp[i] = moveNumbersToRight(array[i]);
        for(var j = 3; j > 0; j--) {
            if(temp[i][j] == temp[i][j-1]) {
                temp[i][j] = temp[i][j] * 2;
                if(temp[i][j]>max) {
                    max = temp[i][j]; 
                }
                temp[i][j-1] = 0;
                temp[i] = moveNumbersToRight(temp[i]);
            }
        }        
    }
    return temp;
}

function moveNumbersToLeft(array) {
    var temp = Array(0,0,0,0);
    var i = 0;
    for(var j=0; j<4; j++) {
       if(array[j] != 0) {
           temp[i] = array[j];
           i++;
       }
   }
   return temp;
}

function moveNumbersToRight(array) {
    var temp = Array(0,0,0,0);
    var i = 3;
    for(var j = 3; j >= 0; j--) {
       if(array[j] != 0) {
           temp[i] = array[j];
           i--;
       }
   }
   return temp;
}

function rotate(array, direction) {
    var temp = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
    if(direction == "left") {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                temp[i][j] = array[j][3-i];
            }
        }
    } else if(direction == "right") {
       for(var i = 0; i<4; i++) {
                    for(var j=0; j<4;j++) {
                        temp[i][j] = array[3-j][i];
                    }
                }             
        }
    return temp;
}

function checkGameOver() {
    if(isAnyCellEmpty()) return false;    
    for(var i = 0; i<4; i++) {
        for(var j=0; j<3; j++) {
            if(board[i][j] == board[i][j+1]) {
                return false;
            }       
        }        
    }
    for(var i = 0; i<3; i++) {
        for(var j=0; j<4; j++) {
            if(board[i][j] == board[i+1][j]) {
                return false;
            }       
        }        
    }
    return true;
}

function paint(cell, number) {
    if(number == 0) {
        cell.innerHTML = "";
    }else {
        cell.innerHTML = number;
    }

    switch(number){
     case 0: cell.style.color="#595959";
             cell.style.background="#f2f2f2";
             break;
    case 2: cell.style.color="#595959";
            cell.style.background="#e6e6e6";
            break;

    case 4:cell.style.color="#595959";
    cell.style.background="#d9d9d9";
    break;
    case 8:cell.style.color="#4d4d4d";
    cell.style.background="#cccccc";
    break;
    case 16:cell.style.color="#4d4d4d";
    cell.style.background="#bfbfbf";
    break;
    case 32:cell.style.color="#4d4d4d";
    cell.style.background="#a6a6a6";
    break;
    case 64:cell.style.color="#4d4d4d";
    cell.style.background="#999999";
    break;
    case 128:cell.style.color="#ffffff";
    cell.style.background="#8c8c8c";
    break;
    case 256:cell.style.color="#ffffff";
    cell.style.background="#808080";
    break;
    case 512:cell.style.color="#ffffff";
    cell.style.background="#737373";
    break;
    case 1024:cell.style.color="#ffffff";
    cell.style.background="#666666";
    break;
    case 2048:cell.style.color="#ffffff";
    cell.style.background="#595959";
    break;
    case 4096:cell.style.color="#ffffff";
    cell.style.background="#4d4d4d";
    break;
    case 8192:cell.style.color="#ffffff";
    cell.style.background="#404040";
    break;
    }
}