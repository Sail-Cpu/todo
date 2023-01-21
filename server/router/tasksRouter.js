const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/taskscreate", async (req,res) => {
    try{
        let {user_id, task_name, taskDate, taskStatus} = req.body;
        if(task_name != null && taskStatus != null){
            let createTasks = pool.query(`insert into tasks(user_id, task_name, end_date, task_status) values($1, $2, $3, $4)`, [user_id, task_name, taskDate, taskStatus]); 
        }else{
            res.send({error: "la tache doit avoir un nom"});
        }
    }catch(error){
        console.log(error)
    }
})

router.post("/usertasks", async (req, res) => {
    try{
        let { user_id } = req.body;
        let allTaskByUser = await pool.query(`select * from tasks where user_id=$1`, [user_id], 
        (err, result) => {
            if(result){
                res.send({tasks: result.rows});
            }else{
                console.log(err);
            }
        })
    }catch(error){
        console.log(error);
    }
})

module.exports = router;