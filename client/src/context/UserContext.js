import React,{createContext} from "react";

export const userContext = createContext();

export const UserContextProvider = (props) => {

    function setToken(data){
        sessionStorage.setItem('token', JSON.stringify(data));
    }

    function getToken(){
        const userToken = JSON.parse(sessionStorage.getItem('token'));
        return userToken;
    }

    return(
        <userContext.Provider value={{setToken, getToken}}>
            {props.children}
        </userContext.Provider>
    )
}