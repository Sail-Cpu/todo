import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { userContext } from "../context/UserContext";

const Todo = () => {

    const {getToken} = useContext(userContext);

    const [user_id, setUserid] = useState();
    const [task_name, setTask_name] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUserid(getToken().data.user_id);
    }, [])

    const config = {
        method: 'post',
        url: "http://localhost:3001/task/taskscreate",
        data:{
            user_id,
            task_name
        }
    }

    const formSubmit = async (e) => {
        try{
            axios(config).then((result) => {
                if(result.data.error){
                    setErrorMessage(result.data.error);
                }else{
                    setErrorMessage('');
                }
            });
        }catch(error){
            console.log(error);
        } 
    }

    return(
        <div className="todo-container">
            <form className="todo" onSubmit={(e) => formSubmit(e)}>
                <div className="todo-top">
                    <input type='checkbox' />
                </div>
                <div className="todo-middle">
                    <textarea className="textarea" value={task_name} placeholder="titre de la tache" onChange={(e) => setTask_name(e.target.value)}></textarea>
                </div>
                <div className="todo-bottom">
                    <button type="submit">Create</button>
                    <span>{errorMessage}</span>
                </div>
            </form>
        </div>
    )
}

export default Todo;