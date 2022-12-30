const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    try{
        let {pseudo, password1, password2} = req.body;
        let pseudoExist = await pool.query(`select * from users where pseudo = $1`, [pseudo]);
        if(!pseudoExist.rowCount > 0){
            if(password1 == password2 && password1.length >= 8){
                let hashPass = await bcrypt.hash(password1, 10);
                let insertUser = await pool.query(`insert into users (pseudo, password) values($1, $2) returning *`, [pseudo, hashPass], 
                (err, result) => {
                    if(result){
                        res.send({loggedIn: true, data: result.rows[0]});
                    }else{
                        console.log(err);
                    }
                })
            }else{
                if(password1 != password2){
                    res.send({loggedIn: true, error: "les mot de passe sont différent"});
                }else{
                    res.send({loggedIn: true, error: "le mot de passe ne contient pas un minimum de 8 caractére"});
                }
            }
        }else{
            res.send({loggedIn: true, error: "pseudo deja utilisé"});
        }
    }catch(error){
        console.log(error);
    }
})

router.post('/signin', async (req, res) => {
    try{
        let {pseudo, password} = req.body;
        const pseudoExist = await pool.query(`select * from users where pseudo = $1`, [pseudo], 
        (err, result) => {
            if(result.rowCount > 0){
                bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        res.send({loggedIn: true, data: result.rows[0]});
                    }else{
                        res.send({loggedIn: false, error: "le pseudo ou le mot de passe est incorecte"});
                    }
                })
            }else{
                res.send({loggedIn: true, error: "le pseudo ou le mot de passe est incorecte"});
            }
        });
       
    }catch(error){
        console.log(error);
    }
})

module.exports = router;