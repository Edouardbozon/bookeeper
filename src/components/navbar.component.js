import React from 'react';

const Navbar = ({navlinks}) => {
    // const link = navlinks.map((link) => link)
    return (
        <div>
            <span>[Bookkeeper]</span>
            <ul>
                <li>
                    {
                        navlinks
                    }
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
