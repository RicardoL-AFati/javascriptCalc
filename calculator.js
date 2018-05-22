// stores user input for calculating
var inputs = [];

// current input string
var totalString;

//Operators array for validation without the .
var operators = ["+", "-", "/", "*"];

function update(){
    totalString = inputs.join("");
    $("#screen").text(totalString);
}

var calcFunctions = {
    AC : function allClear() {
        inputs = [""];
        update();
    },
    CE: function clearEntry() {
        inputs.pop();
        if (inputs.length == 0) inputs = [""];
        update();
    },
    equals : function equals() {
        totalString = inputs.join("");
        var result = Math.round(eval(totalString) * 100) / 100;
        $("#screen").text(result);
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
    // Checks if inputs is a number    
    } else if (!isNaN(input) || input === "."){
        inputs.push(input);
    }

    update();
}


$(":button").on("click", function(){
    if ($(this).children().text() === "AC"){
        calcFunctions.AC();
    } else if ($(this).children().text() === "CE") {
        calcFunctions.CE();
    } else if ($(this).children().text() === "=") {
        calcFunctions.equals();
    } else if ($(this).children().text() === "π") {
        if (operators.includes(inputs[inputs.length - 1]) === false) {
            alert("π must be preceded by an operator: /  *  -  +");
        } else {
            getValue(Math.PI.toFixed(3));
        }
    } else {
        getValue($(this).children().text());
    }
});