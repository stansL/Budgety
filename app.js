//Use of module pattern
//Budget  Controller


var budgetController = (function () {
    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };

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

    return {
        addItem: function (input) {
            var type = input.type;
            var newItem;
            var id;
            if (data.items[type].length > 0) {
                var obj = data.items[type][data.items[type].length - 1];
                id = obj.id + 1;
            } else {
                id = 1;
            }


            if (input.type === 'inc') {
                newItem = new Income(id, input.description, input.value);
            } else {
                newItem = new Expense(id, input.description, input.value);
            }
            data.items[input.type].push(newItem);
            return newItem;
        },
        data: data //TODO: remember to delete this
    };
})();



//UI Controller
var uiController = (function () {
    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        btnAdd: '.add__btn',
        incomeList: '.income__list',
        expenseList: '.expenses__list'

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
        addListItem: function (listItem, type) {
            var html, newHtml, element;
            //            listItem has an id,description and value
            //            1. Create placeholder string with placeholder text

            if (type === 'inc') {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = document.querySelector(domStrings.incomeList);
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = document.querySelector(domStrings.expenseList);

            }



            //            2. Replace placeholder text with actual data
            newHtml = html.replace('%id%', listItem.id).replace('%description%', listItem.description).replace('%value%', listItem.value);

            //            3. Insert html into the DOM
            element.insertAdjacentHTML('beforeend', newHtml);




        },
        clearFields: function () {
            var fields = document.querySelectorAll(domStrings.inputDescription + ',' + domStrings.inputValue);
            var fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach((x, i, arr) => {
                x.value = '';

            });
            fieldsArray[0].focus();

        },
        domStrings: domStrings

    };

})();


//Global App Controller
var appController = (function (bController, uController) {

    var addItemHandler = function () {
        //        1. Get the field input data
        var input = uController.getInput();

        //        2. Add the item to the budget controller

        var newItem = bController.addItem(input);
        //        console.log(newItem); //TODO: delete this
        //        console.log(bController.data); //TODO: delete this


        //        3. Add the item to the UI
        uiController.addListItem(newItem, input.type);

        //        4. Clear the input fields
        uiController.clearFields();


        //        5. Calculate the budget

        //        6. Display/Update the budget to the UI
    };
    var setUpListeners = function () {
        document.querySelector(uController.domStrings.btnAdd).addEventListener('click', addItemHandler);
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13 || e.which === 13) {
                addItemHandler();
            }

        });

    }




    return {
        init: function () {
            setUpListeners();
        }
    }



})(budgetController, uiController);


appController.init();
