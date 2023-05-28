const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { eventProjectConnection } = require("../db");
const { defaultCallback } = require("../utils/dbUtils");
const { verifyToken } = require("../utils/authenticationUtils");

const router = express.Router();

router.get("/employees", (req, res) => {
  eventProjectConnection.execute(
    "SELECT * FROM employees",
    (err, result) => defaultCallback(err, result, res)
  );
});

router.post("/register", (req, res) => {
  const { body } = req;
  const { firstName, lastName, email, password } = body;

  const hashedPassword = bcrypt.hashSync(password, 12);

  eventProjectConnection.execute(
    "INSERT INTO employees (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, hashedPassword],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.post("/signin", (req, res) => {
  const { body } = req;
  const { email: signinEmail, password } = body;

  const incorrectCredentialsResponse = () =>
    res.json({
      message: "Incorrect email or password",
    });

  if (!signinEmail || !password) {
    incorrectCredentialsResponse();
    return;
  }

  eventProjectConnection.execute(
    "SELECT * FROM employees WHERE email=?",
    [signinEmail],
    (err, result) => {
      if (result.length === 0) {
        incorrectCredentialsResponse();
      } else {
        const employee = result[0];
        const isPasswordCorrect = bcrypt.compareSync(password, employee.password);
        const { id, email } = employee;

        if (isPasswordCorrect) {
          const token = jwt.sign({ id, email }, process.env.JWT_SECRET);
          res.json({
            message: "Successfully logged in!",
            token,
          });
        } else {
          incorrectCredentialsResponse();
        }
      }
    }
  );
});

router.get("/token/verify", verifyToken, (req, res) => {
  res.json(res.locals.user);
});

module.exports = router;
