import React from "react";

const Todo = (props) => {
    return(
        <div className="todo-container">
            <div className="todo">
                <div className="todo-top">
                    <input type='checkbox' />
                </div>
                <div className="todo-middle">
                    <div className="textarea">{props.name}</div>
                </div>
                <div className="todo-bottom">
                    <button style={{backgroundColor: 'red'}} type="submit">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Todo;