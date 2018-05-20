var inputs = [];

var calcFunctions = {
    AC : function allClear() {
        inputs = [];
    },
    CE: function clearEntry() {
        inputs.pop();
    },
    equals : function equals() {
        var x = inputs.join("");
        var result = eval(x);
        inputs.push("=", result);
    }
}

$(":button").on("click", function(){
    var pressed = $(this).children().text();
    if (pressed === "AC") {
        calcFunctions.AC();
    } else if (pressed === "CE") {
        calcFunctions.CE();
    } else if (pressed == "π") {
        inputs.push(Math.PI.toFixed(3));
    } else if (pressed === "=") {
        calcFunctions.equals();
    }


    console.log(inputs);
});

