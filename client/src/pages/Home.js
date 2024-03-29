import React,{ useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
/* Components */
import NavBar from "../components/NavBar";
import TodoCreator from "../components/TodoCreator"; 
import Todo from "../components/Todo";
import axios from "axios";

const Home = () => {

    const { getToken } = useContext(userContext);

    const [user_id, setUserid] = useState(getToken().data.user_id);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        try{
            axios(config).then((result) => {
                setTasks(result.data.tasks);
            })
        }catch(error){
            console.log(error);
        }
    }, [])

    const config = {
        method: 'post',
        url: "http://localhost:3001/task/usertasks",
        data:{
            user_id,
        }
    }
    
    console.log(tasks);

    useEffect(() => {
        console.log(tasks[0]);
    }, [tasks])

    return(
        <div className="home">
            <NavBar />
            <div className="home-container">
                <div className="search-container">
                    <input className="search" type='text' />
                </div>
                <div className="todo-list-container">
                    <TodoCreator setTasks={setTasks} tasks={tasks}/>
                    {
                        tasks.map((task, idx) => {
                            return(
                                <Todo key={idx} id={task.task_id}  name={task.task_name} date={task.end_date} status={task.task_status} tasks={tasks} setTasks={setTasks} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;