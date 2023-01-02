import React from "react";

const Todo = () => {
    return(
        <div className="todo-container">
            <div className="todo">
                <div className="todo-top">
                    <input type='checkbox' />
                </div>
                <div className="todo-middle">
                    <textarea placeholder="titre de la tache"></textarea>
                </div>
                <div className="todo-bottom">
                    <button>Create</button>
                </div>
            </div>
        </div>
    )
}

export default Todo;