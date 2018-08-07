var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: 'root',
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    printStock();
});


function printStock() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------\n");
        runBamazon();
    });
}

function runBamazon() {
    inquirer.prompt([{
            type: "input",
            name: "item_id",
            message: "Please provide the id of the product you wish to purchase.",
            validate: function(input) {
                if (input === "") {
                    console.log("You have not entered a valid id number.Please provide the id number of the item you are interested in.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units of this product would you like to purchase?",
            validate: function(input) {
                if (input === "") {
                    console.log("Please specify how many units you'd like.");
                    return false;
                } else {
                    return true;
                }
            }

        }
    ]).then(function(input) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: input.item_id }, function(err, res) {
            if (err) throw err;
            if (input.quantity < res[0].stock_quantity) {
                // Update the inventory
                connection.query("UPDATE products SET stock_quantity = " + (res[0].stock_quantity - input.quantity) + " WHERE item_id = " + input.item_id, function(err, data) {
                    if (err) throw err;
                    console.log("Thank you for your order! Your total is $" + res[0].price * input.quantity);
                    console.log("\n---------------------------------------------------------------------\n");
                    printStock();
                    // End the database connection
                    connection.end();
                })
            } else {
                console.log("Sorry, we do not have enough items to fulfill your request.");
                console.log("\n---------------------------------------------------------------------\n");
            }
        })
    })
}