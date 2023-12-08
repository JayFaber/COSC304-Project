const express = require("express");
const mysql = require('mysql2');
const cors = require('cors'); 

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "user",
    password: "pass",
    database: "database304",
});

const app = express();
app.listen(3001, () => console.log("listening at 3001"));
app.use(express.static("public"));

app.use(express.json({
    limit: "10mb"
}));

app.use(cors());

app.get("/search", (request, response) => {
    const query = "SELECT name, item_id FROM pizza UNION ALL SELECT name, item_id FROM drink;";

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

app.post("/", (request, response) => {
    const searchString = request.body.searchString;

    const query = "SELECT name, item_id FROM Pizza";


    console.log("Query:", query);

    con.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
        }
        response.json(results);
    });
});