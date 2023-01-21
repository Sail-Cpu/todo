import React,{ useState } from "react";
import axios from "axios";

const Todo = (props) => {

    const date = new Date(props.date);
    const formattedDate = date.toLocaleDateString("fr-FR")
    const [taskStatus, setTaskStatus] = useState();
    const [task_id, setTask_id] = useState(props.id);
    const [isOpen, setIsOpen] = useState(false);

    const deleteTask = async (e) => {
        try{
            axios({method: 'post',url: "http://localhost:3001/task/deletetask",data: {task_id}});
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="todo-container">
            <div className="todo">
                <div className="todo-top">
                    <div>{props.name}</div>
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
                    <div className="todo-status" style={props.status == 'To Do' ? {backgroundColor: '#ff292950', color: '#ff2929'} : {} && 
                        props.status == 'In Progress' ? {backgroundColor: '#ffaa2c50', color: '#ffaa2c'} : {} && props.status == 'Done' ? {backgroundColor: '#afff5750', color: '#afff57'} : {}}>
                        {props.status}
                    </div>
                    
                </div>
                <form onSubmit={(e) => deleteTask(e)} className="todo-bottom">
                    <div>{formattedDate}</div>
                    <button type='submit' style={{backgroundColor: 'red'}}>- Delete</button>
                </form>
            </div>
        </div>
    )
}

export default Todo;