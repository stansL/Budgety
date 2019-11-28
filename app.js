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
        },
        budget: 0,
        percentage: 0
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

    var calculateTotals = function (type) {
        var sum = 0;
        data.items[type].forEach((c, i, arr) => {
            sum += c.value;
        });
        data.totals[type] = sum;
    }

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
        deleteItem: function (type, id) {
            //            Either map of filter function
            data.items[type] = data.items[type].filter(e => e.id !== id);
            console.log(data);
        },

        calculateBudget: function () {
            //            Calculate total income and expenses
            calculateTotals('inc');
            calculateTotals('exp');

            //            Calculate budget -> income-expenses
            data.budget = data.totals['inc'] - data.totals['exp'];
            //            Calculate percentage of income spent
            if (data.totals['inc'] > 0) {
                data.percentage = Math.round((data.totals['exp'] / data.totals['inc']) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalExpenses: data.totals.exp,
                totalIncome: data.totals.inc,
                percentage: data.percentage
            }
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
        expenseList: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    }
    //UI Code
    return {
        getInput: function () {
            //            Get type - add__typ
            var type = document.querySelector(domStrings.inputType).value;
            //            Get description - add__description
            var description = document.querySelector(domStrings.inputDescription).value;
            //            Get value - add__value
            var value = parseFloat(document.querySelector(domStrings.inputValue).value);
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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = document.querySelector(domStrings.incomeList);
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = document.querySelector(domStrings.expenseList);

            }



            //            2. Replace placeholder text with actual data
            newHtml = html.replace('%id%', listItem.id).replace('%description%', listItem.description).replace('%value%', listItem.value);

            //            3. Insert html into the DOM
            element.insertAdjacentHTML('beforeend', newHtml);




        },
        deleteListItem: function (selectorId) {
            var toDelete = document.getElementById(selectorId);
            //            toDelete.parentNode.removeChild(toDelete);
            toDelete.remove();
        },
        clearFields: function () {
            var fields = document.querySelectorAll(domStrings.inputDescription + ',' + domStrings.inputValue);
            var fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach((x, i, arr) => {
                x.value = '';

            });
            fieldsArray[0].focus();

        },
        updateBudgetUI: function (budget) {
            document.querySelector(domStrings.incomeLabel).textContent = budget.totalIncome;
            document.querySelector(domStrings.budgetLabel).textContent = budget.budget;
            document.querySelector(domStrings.expensesLabel).textContent = budget.totalExpenses;

            if (budget.percentage > 0) {
                document.querySelector(domStrings.percentageLabel).textContent = budget.percentage + '% ';
            } else {
                document.querySelector(domStrings.percentageLabel).textContent = '---';
            }

        },
        domStrings: domStrings

    };

})();


//Global App Controller
var appController = (function (bController, uController) {

    var updateBudget = function () {


        //        1. Calculate the budget
        bController.calculateBudget();
        //        2. Return the budget 
        var budget = bController.getBudget();
        //        3. Display/Update the budget to the UI
        uController.updateBudgetUI(budget);
    };

    var updatePercentages = function () {
        //        1. Calculate percentages

        //        2. Read them from budget controller
        //        3. Update user interface

    }

    var addItemHandler = function () {
        //        1. Get the field input data
        var input = uController.getInput();
        if (input.type && input.description && input.value && input.value > 0) {

            //        2. Add the item to the budget controller

            var newItem = bController.addItem(input);
            //        console.log(newItem); //TODO: delete this
            //        console.log(bController.data); //TODO: delete this


            //        3. Add the item to the UI
            uiController.addListItem(newItem, input.type);

            //        4. Clear the input fields
            uiController.clearFields();

            //        5. Calculate and update the budget
            updateBudget();

            //            6. Calculate and update percentages
            updatePercentages();

        } else {
            console.log("Missing Data");
        }



    };
    var setUpListeners = function () {
        var dom = uController.domStrings;
        document.querySelector(dom.btnAdd).addEventListener('click', addItemHandler);
        document.querySelector(dom.container).addEventListener('click', deleteItem);
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13 || e.which === 13) {
                addItemHandler();
            }

        });

    };

    var deleteItem = function (event) {
        var itemId, parts, type, id;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemId) {
            parts = itemId.split('-');
            type = parts[0];
            id = parseInt(parts[1]);
            //            1. Delete item from data structure
            budgetController.deleteItem(type, id);
            //            2. Delete item from the UI
            uiController.deleteListItem(itemId);
            //            3. Update the budget
            updateBudget();
            //            4. Calculate and update percentages
            updatePercentages();

        }

    };

    return {
        init: function () {
            uController.updateBudgetUI({
                budget: 0,
                totalExpenses: 0,
                totalIncome: 0,
                percentage: -1
            });
            setUpListeners();
        }
    }



})(budgetController, uiController);


appController.init();
