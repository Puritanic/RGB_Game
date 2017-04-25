/**
 * Created by puritanic on 24.4.17..
 */

var squareNum = 6;
var pickedColor;
var colors = [];
var squares = document.querySelectorAll(".colorSquare");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById('message');
var header = document.querySelector('.header');

var resetButton = document.querySelector('.resetButton');
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
        // mode buttons
    modeSetup();
        // squares color loop
    colorLoops();
        // reset all
    reset();
        // reset button listener
    resetButton.addEventListener('click', function () {
        reset();
    });
}
function modeSetup(){
    for(var j = 0; j < modeButtons.length; j++){
        modeButtons[j].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Easy' ? squareNum = 3: squareNum = 6; // condition ? expr1 : expr2
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            reset();
        });
    }
}
function colorLoops(){
    for (var i = 0; i < squares.length; i++) {
        // add click event listener to squares
        squares[i].addEventListener('click', function () {
            var clickedColor = this.style.background;
            // compare if clicked color is equal to pickedColor
            if(clickedColor === pickedColor) {
                message.textContent = "That's correct!";
                resetButton.textContent = 'Play again?';
                // CHANGES BACK BUTTON TO NEW COLORS AFTER CLICKING ON PLAY AGAIN
                resetButton.addEventListener('click',function () {
                    resetButton.textContent = 'NEW COLORS';
                    message.textContent = "";
                });
                colorChanger(clickedColor);
            } else {
                this.style.background = "#232323";
                message.textContent = "Try again";
            }
        });
    }
}
function reset() {
    colors = generateRandomColors(squareNum);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = 'New Colors?';
    message.textContent = '';

    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
        header.style.background = '#3A77A8';
    }
}

function colorChanger(color){
    // changes colors and header when player guess color right
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
    header.style.background = color;
}

function pickColor() {
    // randomize colors
   var random = Math.floor(Math.random() * colors.length);
   return colors[random];
}

function generateRandomColors(num) {
 // make array
    var arr = [];
    // add random colors to array
    for(var i = 0; i < num; i++) {
        // get random color and push it into arr
        arr.push(randomColor());
    }
    // return that array
    return arr;
}

function randomColor() {
    var green = Math.floor(Math.random() * 256);
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}
