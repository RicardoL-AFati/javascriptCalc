// stores user input for calculating
var inputs = [];

// current input string
var totalString;

//Operators array for validation without the .
var operators = ["+", "-", "/", "*"];

// Creates string of inputs array -> changes screen span text to that string
function update(){
    totalString = inputs.join("");
    $("#screen").text(totalString);
}
// object that contains the three functions that correspond to calculator buttons
var calcFunctions = {
    // Clears inputs array and calls update
    AC : function allClear() {
        inputs = [""];
        update();
    },
    // takes last element off inputs array and calls update 
    CE: function clearEntry() {
        inputs.pop();
        update();
    },
    // Creates string from inputs, evaluates string as javascript, updates screen span, and updates inputs.
    equals : function equals() {
        totalString = inputs.join("");
        // result = return from eval(totalString) - rounded to two decimal places 
        var result = Math.round(eval(totalString) * 100) / 100;
        // setting text of screen span to result
        $("#screen").text(result);
        // clearing inputs of past operations and setting to result
        inputs = [result];
    }
}
function getValue(input) {
    // Checks for duplicate period. If last element of inputs and button pressed are both "." ->
    if (inputs[inputs.length - 1] === "." && input === "."){
        alert("Duplicate . ");
    // Checks when user input has just started -- if input was a number and not an operator   
    } else if (inputs.length === 1 && operators.includes(input) === false) {
        inputs.push(input);
    // Check for duplicate operators    
    } else if (operators.includes(inputs[inputs.length - 1]) === false){
        inputs.push(input);
    // Checks if inputs is a number or "."
    } else if (!isNaN(input) || input === "."){
        inputs.push(input);
    }

    update();
}


$(":button").on("click", function(){
    if ($(this).children().text() === "AC"){
        // AC -> calls allClear()
        calcFunctions.AC();
    } else if ($(this).children().text() === "CE") {
        // CE -> calls clearEntry()
        calcFunctions.CE();
    } else if ($(this).children().text() === "=") {
        // = -> calls equals()
        calcFunctions.equals();
    } else if ($(this).children().text() === "π") {
        // Ensures user inputted an operator before clicking PI
        if (operators.includes(inputs[inputs.length - 1]) === false) {
            alert("π must be preceded by an operator: /  *  -  +");
        } else {
            // getValue with PI rounded to 3 decimal places
            getValue(Math.PI.toFixed(3));
        }
    } else {
        // All other buttons
        getValue($(this).children().text());
    }
});