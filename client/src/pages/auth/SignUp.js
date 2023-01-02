import React,{useState, useContext} from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";

const SignUp = () => {

    const { setToken } = useContext(userContext);

    const [pseudo, setPseudo] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const config = {
        method: 'post',
        url: "http://localhost:3001/auth/signup",
        data:{
            pseudo,
            password1,
            password2
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
                    setErrorMessage(result.data.error);
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
                    <h1>Sign up</h1>
                </div>
                <form className="sign" onSubmit={(e) => formSubmit(e)}>
                    <div className="sign-input-container">
                        <input value={pseudo} type='text' placeholder="Pseudo" onChange={(e) => setPseudo(e.target.value)}></input>
                        <input value={password1} type='password' placeholder="Password" onChange={(e) => setPassword1(e.target.value)}></input>
                        <input value={password2} type='password' placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)}></input>
                    </div>
                    <div className="sign-button-container">
                        <button type="submit">S'inscrire</button>
                        <span>{errorMessage}</span>
                    </div>
                </form>
                <div className="sign-bottom">
                    <span>Tu à déja un compte &nbsp;</span><Link to='/signin'>Se connecter</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;