import React, { useContext } from 'react';
import {userContext} from '../context/UserContext'

const NavBar = () => {

    const {getToken} = useContext(userContext);

    return(
        <div className='nav-bar'>
            <span>TodoList</span>
            <div className='user-icon'>
                {getToken().data.username[0]}
            </div>
        </div>
    )
}

export default NavBar;