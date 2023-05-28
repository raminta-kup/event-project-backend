require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const customersRouter = require("./router/customers");
const employeesRouter = require("./router/employees");
const eventProjectAuthRouter = require("./router/eventProjectAuthentication");

app.use(express.json());
app.use(cors());
app.use(customersRouter);
app.use(employeesRouter);
app.use(eventProjectAuthRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})