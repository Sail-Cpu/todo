const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const authRouter = require("./router/authRouter");
const tasksRouter = require("./router/tasksRouter");

app.use(cors());
app.use(express.json());

/* User Authentification */
app.use('/auth', authRouter);
app.use('/task', tasksRouter);

app.get("/users", async (req, res) => {
    try{
        const allUsers = await pool.query("select * from users");
        res.json(allUsers.rows);
    }catch(error){
        console.log(error);
    }
})

app.listen(3001, () => {
    console.log("server has started on port 3001");
})