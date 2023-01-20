import React, { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios';
import { userContext } from "../context/UserContext";

const Todo = () => {

    const {getToken} = useContext(userContext);

    const [user_id, setUserid] = useState();
    const [task_name, setTask_name] = useState();
    const [taskStatus, setTaskStatus] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const taskName = useRef();

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
        e.preventDefault();
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

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="todo-container">
            <form className="todo" onSubmit={(e) => formSubmit(e)}>
                <div className="todo-top">
                    <input type='text' value={task_name} onChange={(e) => setTask_name(e.target.value)}/>
                    <span onClick={() => setIsOpen(!isOpen)}>...</span>
                    {isOpen &&
                        <div className="status-choose-container">
                            <div className="status-choose" onClick={() => setTaskStatus('To Do') || setIsOpen(false)}>To Do</div>
                            <div className="status-choose" onClick={() => setTaskStatus('In Progress') || setIsOpen(false)}>In Progress</div>
                            <div className="status-choose" onClick={() => setTaskStatus('Done') || setIsOpen(false)}>Done</div>
                        </div>
                    }
                </div>
                <div className="todo-middle">
                    {taskStatus && 
                        <div className="todo-status">
                            {taskStatus}
                        </div>
                    }
                    
                </div>
                <div className="todo-bottom">
                    <input type='date' />
                    <button>+ Create</button>
                </div>
            </form>
        </div>
    )
}

export default Todo;