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
    const query = "SELECT name, description, cost, item.item_id,image_name FROM pizza JOIN item ON pizza.item_id = item.item_id;";

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
    const query = "SELECT name, description, cost, item.item_id,image_name FROM drink JOIN item ON drink.item_id = item.item_id;";

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
    const query = "SELECT name, description, cost, item.item_id,image_name FROM dessert JOIN item ON dessert.item_id = item.item_id;";

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
        }

        response.json(results);
    });
});

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