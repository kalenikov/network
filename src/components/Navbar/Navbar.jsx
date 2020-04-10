import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to={'/profile'} activeClassName={s.acitveLink}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/dialogs'} activeClassName={s.acitveLink}>Message</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/news'} activeClassName={s.acitveLink}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/music'} activeClassName={s.acitveLink}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/settings'} activeClassName={s.acitveLink}>Settings</NavLink>
        </div>
    </nav>
}

export default Navbar