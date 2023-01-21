import React,{ useState } from "react";
import { format } from 'date-fns';

const Todo = (props) => {

    const date = new Date(props.date);
    const formattedDate = date.toLocaleDateString("fr-FR")
    const [taskStatus, setTaskStatus] = useState();
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="todo-bottom">
                    <div>{formattedDate}</div>
                    <button style={{backgroundColor: 'red'}}>- Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Todo;