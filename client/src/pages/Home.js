import React,{ useContext, useState } from "react";
import { userContext } from "../context/UserContext";
/* Components */
import NavBar from "../components/NavBar";
import Todo from "../components/Todo";

const Home = () => {


    const { userTasks } = useContext(userContext);

    return(
        <div className="home">
            <NavBar />
            <div className="home-container">
                <div className="search-container">
                    <input className="search" type='text' />
                </div>
                <div className="todo-list-container">
                    {userTasks.map(() => {
                        return(
                            <Todo />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;