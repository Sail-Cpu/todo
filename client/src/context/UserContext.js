import React,{createContext, useState} from "react";

export const userContext = createContext();

export const UserContextProvider = (props) => {

    const [userTasks, setUserTasks] = useState([]);

    function setToken(data){
        sessionStorage.setItem('token', JSON.stringify(data));
    }

    function getToken(){
        const userToken = JSON.parse(sessionStorage.getItem('token'));
        setUserTasks([userToken.data.tasks]);    
        return userToken;
    }

    return(
        <userContext.Provider value={{setToken,userTasks, getToken}}>
            {props.children}
        </userContext.Provider>
    )
}