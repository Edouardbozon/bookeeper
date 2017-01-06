import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Router, Route, Link, browserHistory } from 'react-router';

const Navbar = ({authenticated, routes}) => {
    const activeItem = 'login';
    return (
        <Menu inverted>
            <Menu.Item>
                [Bookkeeper]
            </Menu.Item>
            { authenticated ?
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}>
                    Logout
                </Menu.Item> :
                <Menu.Item
                    name='login'
                    active={activeItem === ''}>
                    Login
                </Menu.Item> }
        </Menu>
    );
};

export default Navbar;
