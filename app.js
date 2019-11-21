//Use of module pattern
var budgetController = (function () {
    var x = 23;
    var add = function (a) {
        return a + x;
    };


    return {
        publicTest: function (b) {
            var total = add(b);
            return total;
        }
    }
})();




var uiController = (function () {
    //UI Code

})();


var appController = (function (bController, uController) {
    var z = bController.publicTest(5);

    return {
        anotherPublic: function () {
            console.log(z);
        }

    }

})(budgetController, uiController);
