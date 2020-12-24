var board = Array(Array(0, 2, 0, 4), Array(2, 2, 4, 4), Array(0, 2, 4, 2), Array(0, 0, 0, 2));

//start game
initBoard();

document.onkeydown = checkKey;
function checkKey(e) {
    switch(e.keyCode) {
        case 37: move("left");
        case 39: move("right");
        case 38: move("up");
        case 40: move("down");
    }
    //37 left, 39 right, 38 up, 40 down
}

function initBoard() {
    //initialize the board when new game starts.
  /*  for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //Decide two cells having '2' from the beginning.
    for (var i = 2; i > 0; i--) {
        var x = parseInt(Math.random() * 4);
        var y = parseInt(Math.random() * 4);
        if (board[x][y] == 0) board[x][y] = 2;
        else i++;
    }*/
    draw();
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
        case "left": board = mergeLeft();
        case "right":
        case "up":
        case "right":
    }

    draw();
}

function mergeLeft() {
    var temp = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));

    for(var i = 0; i < 4; i++) {
        temp[i] = moveNumbersToLeft(board[i]);
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
