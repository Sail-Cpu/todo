import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    function disconect(){
        sessionStorage.removeItem('token');
        navigate('/signin')
    } 

    return(
        <div className="home">
            home
            <button onClick={() => disconect()}>disconect</button>
        </div>
    )
}

export default Home;