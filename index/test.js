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


app.get("/allUser", (request, response) => {
    const query = "SELECT * FROM user";

    con.query(query, (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Internal Server Error");
        }
        console.log(results)
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

    const query = "SELECT * FROM review WHERE item_id =" + index + ";";

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
    const { user_id, item_id, text } = request.body;

    if (!user_id || !item_id || !text) {
        console.error("Invalid request parameters");
        response.status(400).json({
            error: 'Bad Request'
        });
        return;
    }

    const check = "SELECT * FROM review WHERE user_id = ? AND item_id = ?;";

    con.query(check, [user_id, item_id], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Error checking for existing review:", checkErr);
            response.status(500).json({
                error: 'Internal Server Error'
            });
            return;
        }

        if (checkResult.length > 0) {
            console.log("Review already exists.");
            response.json({
                message: 'Review already exists'
            });
        } else {
            const insertQuery = "INSERT INTO review (user_id, item_id, name, text) VALUES (?, ?, (SELECT name FROM user WHERE user_id = ?), ?);";
            con.query(insertQuery, [user_id, item_id, user_id, text], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error("Error inserting review:", insertErr);
                    response.status(500).json({
                        error: 'Internal Server Error'
                    });
                    return;
                }

                console.log("Review inserted successfully:", insertResult);
                response.json({
                    insertedId: insertResult.insertId,
                    message: 'Review inserted successfully'
                });
            });
        }
    });
});



app.post("/tryLogin", (request, response) => {
    const data = request.body;
    console.log(data)

    // Parametrized
    const query = "SELECT user_id FROM user WHERE email = ? AND password = ?";

    con.query(query, [data.email, data.password], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({
                error: 'Internal Server Error'
            });
        }
        if (result.length > 0) response.send(result[0]);
        else response.send('0')
    })
});

app.post("/createUser", (request, response) => {
    const data = request.body;
    console.log(data.password)

    // Parametrized
    const query = "INSERT INTO user (password, email, name, address) VALUES (?, ?, ?, ?)";

    con.query(query, [data.pass, data.email, data.name, data.address], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({
                error: 'Internal Server Error'
            });
            return;
        }
    });
});

app.post("/checkEmail", (request, response) => {
    const data = request.body;

    // Parametrized
    const query = "SELECT email FROM user WHERE email = ?";

    con.query(query, [data.email], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({
                error: 'Internal Server Error'
            });
            return;
        }
        console.log(result)
        response.json(result.length);
    });
});

app.post("/getUserName", (request, response) => {
    const data = request.body;

    // Parametrized
    const query = "SELECT name FROM user WHERE user_id = ?";

    con.query(query, [data.id], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({
                error: 'Internal Server Error'
            });
            return;
        }
        console.log(result)
        response.json(result);
    });
});

app.post("/delUser", (request, response) => {
    const query = "DELETE FROM user WHERE user_id = ?";
    
    con.query(query, [request.body.id], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({
                error: 'Internal Server Error'
            });
            return;
        }


        response.status(200).json({
            message: 'User deleted successfully'
        });
    });
});


app.post("/updateUser", (request, response) => {
    const query = "UPDATE user (name) VALUES (?) WHERE user_id = ?";
    

    con.query(query, [data.name], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({
                error: 'Internal Server Error'
            });
            return;
        }
        console.log(result)
    });
});
app.post("/addToCart", (request, response) => {
    const user_id = request.body.user_id;
    const item_id = request.body.item_id;

    if (!user_id || !item_id) {
        response.status(400).json({
            error: 'Bad Request: user_id or item_id is missing'
        });
        return;
    }

    const insertOrderItemQuery = `
        INSERT INTO orderItem (user_id, item_id, quantity)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE quantity = quantity + 1;
    `;

    con.query(insertOrderItemQuery, [user_id, item_id], (orderItemErr, orderItemResult) => {
        if (orderItemErr) {
            console.error('Error adding/updating orderItem:', orderItemErr);
        } else {
            console.log('OrderItem added/updated', orderItemResult);
            response.json({});
        }
    });
});

app.post("/removeFromCart", (request, response) => {
    const userId = request.body.user_id;
    const itemId = request.body.item_id;

    const updateOrderItemQuery = `UPDATE orderitem
        SET quantity = quantity - 1
        WHERE user_id = ? AND item_id = ?;`;

    con.query(updateOrderItemQuery, [userId, itemId], (updateErr, updateResult) => {
        if (updateErr) {
            console.error('Error updating:', updateErr);
            response.status(500).json({
                error: 'Internal Server Error'
            });
        } else {
            console.log(updateResult);
            response.status(200).end();
        }
    });
});


app.post("/getCart", (request, response) => {
    const user_id = request.body.id;

    console.log(user_id)

    const query = `SELECT item_id, quantity FROM orderItem WHERE user_id = ?;`;

    con.query(query, [user_id], (err, data) => {
        if (err) {
            console.error('I am so close to killing myself right now:', err);
        } else {
            console.log('Cart items fetched:', user_id);
            response.json(data);
        }
    });
});

