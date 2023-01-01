import React,{createContext, useState} from "react";

export const userContext = createContext();

export const UserContextProvider = (props) => {

    const [user, setUser] = useState();

    function setToken(data){
        sessionStorage.setItem('token', JSON.stringify(data));
    }

    function getToken(){
        const userToken = JSON.parse(sessionStorage.getItem('token'));
        setUser(userToken.data);
        return userToken;
    }

    return(
        <userContext.Provider value={{setToken, user, getToken}}>
            {props.children}
        </userContext.Provider>
    )
}