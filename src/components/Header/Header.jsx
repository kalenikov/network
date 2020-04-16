import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
    // debugger
    return <header className={s.header}>
        <img src='https://i.pinimg.com/736x/5a/ae/50/5aae503e4f037a5a4375944d8861fb6a.jpg'/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? props.login
                : <NavLink to={'/login'}>LOGIN</NavLink>}
        </div>
    </header>
}

export default Header