//Use of module pattern
//Budget  Controller


var budgetController = (function () {
    var data = {
        items: {
            expenses: [],
            incomes: []
        },
        totals: {
            expenses: [],
            incomes: []
        }
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };



})();



//UI Controller
var uiController = (function () {
    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        btnAdd: '.add__btn'

    }
    //UI Code
    return {
        getInput: function () {
            //            Get type - add__typ
            var type = document.querySelector(domStrings.inputType).value;
            //            Get description - add__description
            var description = document.querySelector(domStrings.inputDescription).value;
            //            Get value - add__value
            var value = document.querySelector(domStrings.inputValue).value;
            return {
                type: type,
                description: description,
                value: value
            };


        },
        domStrings: domStrings

    };

})();


//Global App Controller
var appController = (function (bController, uController) {

    var setUpListeners = function () {
        document.querySelector(uController.domStrings.btnAdd).addEventListener('click', addItemHandler);
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13 || e.which === 13) {
                addItemHandler();
            }

        });

    }


    var addItemHandler = function () {
        //        1. Get the field input data
        var input = uController.getInput();

        //        2. Add the item to the budget controller

        //        3. Add the item to the UI

        //        4. Calculate the budget

        //        5. Display/Update the budget to the UI
    };

    return {
        init: function () {
            setUpListeners();
        }
    }



})(budgetController, uiController);


appController.init();
