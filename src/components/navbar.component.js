import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Router, Route, Link, browserHistory } from 'react-router';

const Navbar = ({navlinks}) => {
    const activeItem = 'sign-in';
    console.log(Router);
    return (
        <Menu stackable inverted>
            <Menu.Item>
                [Bookkeeper]
            </Menu.Item>
            <Menu.Item
                name='sign-in'
                active={activeItem === 'sign-in'}>
                Sign-in
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;
