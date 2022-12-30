const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const authRouter = require("./router/authRouter");

app.use(cors());
app.use(express.json());

/* User Authentification */
app.use('/auth', authRouter)

app.listen(3001, () => {
    console.log("server has started on port 3001");
})