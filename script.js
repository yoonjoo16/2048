var board = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));

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
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
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

//draw
function draw() {    
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = document.getElementById("board").rows[i].cells[j];
            if(board[i][j] != 0) cell.innerHTML = board[i][j];
            else cell.innerHTML = "";
        }
    }
}

//move as the direction and add the numbers
function move(direction) {
    switch(direction) {
        case "left" : board = mergeLeft(board); break;
        case "right" : board = mergeRight(board); break;
        case "up" : board = rotate(mergeLeft(rotate(board, "left")), "right"); break;
        case "down" : board = rotate(mergeLeft(rotate(board, "right")), "left"); break;
    } 
    generateNewNumber();
    draw(); 
}

function mergeLeft(array) {
    var temp = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));

    for(var i = 0; i < 4; i++) {
        temp[i] = moveNumbersToLeft(array[i]);
        for(var j=0; j<3; j++) {
            if(temp[i][j] == temp[i][j+1]) {
                temp[i][j] = temp[i][j] * 2;
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
        for(var j=3; j > 1; j--) {
            if(temp[i][j] == temp[i][j-1] && temp[i][j] != 0) {
                temp[i][j] = temp[i][j] * 2;
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
