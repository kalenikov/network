import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'

const Header = (props) => {
    // debugger
    return <header className={s.header}>
        <img src={logo}/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? props.login
                : <NavLink to={'/login'}>LOGIN</NavLink>}
        </div>
    </header>
}

export default Header