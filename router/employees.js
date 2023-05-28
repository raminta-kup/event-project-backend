const express = require("express");
const router = express.Router();
const { eventProjectConnection } = require("../db");
const { defaultCallback } = require("../utils/dbUtils");
const { verifyToken } = require("../utils/authenticationUtils");

router.get("/employees", (req, res) => {
    eventProjectConnection.execute(
        "SELECT * FROM employees",
        (err, result) => defaultCallback(err, result, res)
    );
})

router.get("/profile/:id", verifyToken, (req, res) => {
    const { id } = req.params;
  
    eventProjectConnection.execute(
      "SELECT * FROM employees WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ message: "Employee not found" });
        }
  
        const employee = result[0];
        res.json({ employee });
      }
    );
  });
  
  module.exports = router;