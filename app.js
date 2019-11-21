//Use of module pattern
//Budget  Controller

var budgetController = (function () {})();



//UI Controller
var uiController = (function () {
    //UI Code

})();


//Global App Controller
var appController = (function (bController, uController) {

    var addItemHandler = function () {
        //        1. Get the field input data


        //        2. Add the item to the budget controller

        //        3. Add the item to the UI

        //        4. Calculate the budget

        //        5. Display/Update the budget to the UI
    };


    document.querySelector('.add__btn').addEventListener('click', addItemHandler);

    document.addEventListener('keypress', e => {
        if (e.keyCode === 13 || e.which === 13) {
            addItemHandler();
        }

    })
})(budgetController, uiController);
