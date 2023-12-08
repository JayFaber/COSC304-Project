const express = require("express");
const mysql = require('mysql2');
const cors = require('cors'); 
const parse = require('body-parser')

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "user",
    password: "pass",
    database: "database304",
});

const app = express();
app.listen(3001, () => console.log("listening at 3001"));
app.use(parse.json());
app.use(express.static("public"));

app.use(express.json({
    limit: "10mb"
}));

app.use(cors());

// REWRITE GET ID OF ITEM THAT MATCHES INDEX
// SEE POST REQUESTS AT BOTTOM FOR CORRECT SYNTAX
// MUST BE PARAMETRIZED 
app.get("/search", (request, response) => {
    const query = "SELECT pizza.name AS name, item_id FROM pizza UNION ALL SELECT drink.name AS name, item_id FROM drink UNION ALL SELECT dessert.name AS item_name, item_id FROM dessert";

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
        }

        response.json(results);
    });
});

app.get("/pizzaInfo", (request, response) => {
    const query = "SELECT * FROM pizza JOIN item ON pizza.item_id = item.item_id;";

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
        }

        response.json(results);
    });
});

app.get("/drinkInfo", (request, response) => {
    const query = "SELECT * FROM drink JOIN item ON drink.item_id = item.item_id;";

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
        }

        response.json(results);
    });
});

app.get("/dessertInfo", (request, response) => {
    const query = "SELECT * FROM dessert JOIN item ON dessert.item_id = item.item_id;";

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
        }

        response.json(results);
    });
});

// Get all from item matching item_id
app.post("/itemInfo", (request, response) => {
    const index = request.body.index;

    const query = "SELECT * FROM (SELECT * FROM pizza UNION ALL SELECT * FROM drink UNION ALL SELECT * FROM dessert) AS combine JOIN item ON item.item_id = combine.item_id WHERE item.item_id =" + index + ";";

    console.log("Query:", query);

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
        }
        response.json(results);
    });
});

// Get data from review
app.post("/itemRev", (request, response) => {
    const index = request.body.index;

    // PLACEHOLDER: NEED THIS QUERY!!!!!!!
    // SELECT ALL REVIEWS WHERE index = item_id
    const query = "SELECT * FROM Pizza";

    console.log("Query:", query);

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
        }
        response.json(results);
    });
});

// Post a review to the server
app.post("/postReview", (request, response) => {
    const data = request.body;

    // Parametrized
    // REWRITE ASSUME FREE ACCESS TO user_id AND item_id
    const query = "INSERT INTO review (user_id, item_id, username, text) VALUES (?, ?, ?, ?)";
    
    con.query(query, [data.username, data.password, data.email, data.name, data.address], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        response.json({ message: 'User created successfully', insertedId: result.insertId });
    });
});

app.post("/createUser", (request, response) => {
    const data = request.body;

    // Parametrized
    const query = "INSERT INTO User (username, password, email, name, address) VALUES (?, ?, ?, ?, ?)";
    
    con.query(query, [data.username, data.password, data.email, data.name, data.address], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        response.json({ message: 'User created successfully', insertedId: result.insertId });
    });
});


///// STATEMENTS NEEDED

// search for review by user under specific item

// check if email is in use
// search for username and password with email
// search for user with username and password


// delete user with user id
// edit account details with user_id and password  
//      change name
//      change password
//      change username
//      change email
//      change address

// get cart items
// add to cart
// update quantity in cart
// delete one from cart
// delete all

// search for coupon using coupon code