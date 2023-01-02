import React,{ useState, useContext} from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";

const SignIn = () => {

    const { setToken } = useContext(userContext);
    const navigate = useNavigate();

    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const config = {
        method: 'post',
        url: "http://localhost:3001/auth/signin",
        data:{
            pseudo,
            password
        }
    }

    const formSubmit = async (e) => {
        e.preventDefault(); 
        try{
            axios(config).then((result) => {
                console.log(result.data); 
                if(!result.data.loggedIn){
                    setErrorMessage(result.data.error);
                }else{
                    setErrorMessage('');
                    setToken(result.data);
                    navigate('/');
                }
            }).catch((error) => {
                console.log(error);
            })
        }catch(error){
            console.log(error);
        } 
    }
    
    return(
        <div className="sign-page">
            <div className="sign-container">
                <div className="sign-top">
                    <h1>Sign in</h1>
                </div>
                <form className="sign" onSubmit={(e) => formSubmit(e)}>
                    <div className="sign-input-container">
                        <input value={pseudo} type='text' placeholder="Pseudo" onChange={(e) => setPseudo(e.target.value)}></input>
                        <input value={password} type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="sign-button-container">
                        <button type="submit">Se connécter</button>
                        <span>{errorMessage}</span>
                    </div>
                </form>
                <div className="sign-bottom">
                    <span>Tu n'a pas encore de compte &nbsp;</span><Link to='/signup'>S'inscrire</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;