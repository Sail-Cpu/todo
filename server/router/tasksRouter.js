const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/taskscreate", async (req,res) => {
    try{
        let {user_id, task_name, taskDate, taskStatus} = req.body;
        if(task_name != "" && taskStatus != null){
            let createTasks = pool.query(`insert into tasks(user_id, task_name, end_date, task_status) values($1, $2, $3, $4) returning *`, [user_id, task_name, taskDate, taskStatus], 
            (err, result) => {
                if(result){
                    res.send({tasks: result.rows});
                }else{
                    console.log(err);
                }
            }); 
        }else{
            res.send({error: "tous les champs doive étre rempli"});
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

router.post("/deletetask", async (req, res) => {
    try{
        let { task_id } = req.body;
        let deleteTask = await pool.query(`delete from tasks where task_id=$1`, [task_id])
    }catch(error){
        console.log(error);
    }
})

router.post("/updatetask", async (req, res) => {
    try{
        let { task_id, newName, newStatus, adate } = req.body;
        let deleteTask = await pool.query(`update tasks set task_name=$2, task_status=$3, end_date=$4 where task_id=$1`, 
        [task_id, newName, newStatus, adate]);
    }catch(error){
        console.log(error);
    }
})

module.exports = router;