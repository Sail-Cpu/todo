import React,{ useEffect, useState, useRef} from "react";
import axios from "axios";
import Pencil from '../img/pencil.png';

const Todo = (props) => {

    const newTaskName = useRef(null);
    const newTaskDate = useRef(null);
    const [newTaskStatus, setNewTaskStatus] = useState();
    
    const [task_id, setTask_id] = useState();
    const [taskName, setTaskName] = useState();
    const [taskStatus, setTaskStatus] = useState();
    const [taskDate, setTaskDate] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const date = new Date(taskDate);
    const formattedDate = date.toLocaleDateString("fr-FR")

    const [isOpen, setIsOpen] = useState(false);
    const [updateTask, setUpdateTask] = useState(false);

    useEffect(() => {
        setTask_id(props.id);
        setTaskName(props.name);
        setTaskStatus(props.status);
        setTaskDate(props.date)
    }, [props.tasks])

    const deleteTask = async () => {
        try{
            axios({method: 'post', url: "http://localhost:3001/task/deletetask", data: {task_id}});
            const updatedTasks = props.tasks.filter(task => task.task_id !== props.id);
            props.setTasks(updatedTasks);
        }catch(error){
            console.log(error);
        }
    }

    const update = () => {
        const newName = newTaskName.current.value;
        let newStatus = '';
        let newDate = newTaskDate.current.value;
        let adate = taskDate;
        if(newTaskStatus){
            newStatus = newTaskStatus
        }else{
            newStatus = taskStatus;
        }
        if(newDate){
            adate = newDate;
        }
        console.log(adate)
        console.log(newName + ' ' + newStatus + ' ' + adate);
        try{
            axios({method: 'post', url: "http://localhost:3001/task/updatetask", data: {task_id, newName, newStatus, adate}});
            setTaskName(newName);
            setTaskStatus(newStatus);
            setTaskDate(adate);
            setNewTaskStatus();
            setUpdateTask(false)
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="todo-container">
            {errorMessage &&
                <div className="todo-error">
                    {errorMessage}
                </div>
            }
            <div className="todo">
                <div className="todo-top">
                    {!updateTask ?
                        <div>{taskName}</div>
                        :
                        <>
                            <input type="text" ref={newTaskName} defaultValue={taskName} />
                            <span onClick={() => setIsOpen(!isOpen)}>...</span>
                        </>
                    }
                    {isOpen &&
                        <div className="status-choose-container">
                            <div className="status-choose" onClick={() => setNewTaskStatus('To Do') || setIsOpen(false)}>To Do</div>
                            <div className="status-choose" onClick={() => setNewTaskStatus('In Progress') || setIsOpen(false)}>In Progress</div>
                            <div className="status-choose" onClick={() => setNewTaskStatus('Done') || setIsOpen(false)}>Done</div>
                        </div>
                    }
                </div>
                <div className="todo-middle">
                    {!newTaskStatus ?
                        <div className="todo-status" style={taskStatus == 'To Do' ? {backgroundColor: '#ff292950', color: '#ff2929'} : {} && 
                            taskStatus == 'In Progress' ? {backgroundColor: '#ffaa2c50', color: '#ffaa2c'} : {} && taskStatus == 'Done' ? {backgroundColor: '#afff5750', color: '#afff57'} : {}}>
                            {taskStatus}
                        </div>
                        :
                        <div className="todo-status" style={newTaskStatus == 'To Do' ? {backgroundColor: '#ff292950', color: '#ff2929'} : {} && 
                            newTaskStatus == 'In Progress' ? {backgroundColor: '#ffaa2c50', color: '#ffaa2c'} : {} && newTaskStatus == 'Done' ? {backgroundColor: '#afff5750', color: '#afff57'} : {}}>
                            {newTaskStatus}
                        </div>
                    }
                    
                </div>
                <div className="todo-bottom">
                    {!updateTask ?
                        <div>{formattedDate}</div>
                        :
                        <input type="date" ref={newTaskDate} />
                    }
                    
                    <div>
                        {!updateTask ?
                            <>
                                <button className="update-button" onClick={(e) => setUpdateTask(true)}><img src={Pencil} /></button>
                                <button type='submit' style={{backgroundColor: 'red'}} onClick={() => deleteTask()} >- Delete</button>
                            </> 
                            :
                            <>
                                <button style={{backgroundColor: 'red'}} onClick={(e) => setUpdateTask(false)}>Anuler</button>
                                <button type='submit' style={{backgroundColor: 'green'}} onClick={() => update()} >valider</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;