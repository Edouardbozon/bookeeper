import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

const Navbar = ({authenticated, routes}) => {
    const activeItem = 'login';
    return (
        <AppBar/>
    );
};

export default Navbar;


// <Menu.Item>
//
// </Menu.Item>
// { authenticated ?
//     <Menu.Item
//     name='logout'
//     active={activeItem === 'logout'}>
//     Logout
//     </Menu.Item> :
//     <Menu.Item
//     name='login'
//     active={activeItem === ''}>
//     Login
//     </Menu.Item> }
