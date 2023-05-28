const express = require("express");
const router = express.Router();
const { eventProjectConnection } = require("../db");
const { defaultCallback } = require("../utils/dbUtils");

router.get("/customers", (req, res) => {
    eventProjectConnection.execute(
        "SELECT * FROM customers",
        (err, result) => defaultCallback(err, result, res)
    );
})

router.post('/customers', (req, res) => {
    const { body: { firstName, lastName, email, phoneNumber } } = req;

    eventProjectConnection.execute(
        'INSERT INTO customers (firstName, lastName, email, phoneNumber) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, phoneNumber],
        (err, result) => defaultCallback(err, result, res)
    )
});

router.delete("/customers/:id", (req, res) => {
    const { id } = req.params;
    eventProjectConnection.execute(
        "DELETE FROM customers WHERE id=?",
        [id],
        (err, result) => defaultCallback(err, result, res)
    );
})

module.exports = router;