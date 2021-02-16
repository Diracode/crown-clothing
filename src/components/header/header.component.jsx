import React from 'react';
import { Link } from 'react-router-dom';
import { GiQueenCrown } from 'react-icons/gi';

import './header.styles.scss';

const Header = () => {
    return (
        <div className='header'>
            <Link to='/' className='logo-container'>
                <GiQueenCrown className='logo'/>
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/shop'>CONTACT</Link>
            </div>
        </div>
    )
};

export default Header;