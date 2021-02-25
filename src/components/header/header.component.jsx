import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import { GiQueenCrown } from 'react-icons/gi';

import './header.styles.scss';

const Header = ({currentUser}) => {
    const handleClick = () => {
        auth.signOut();
    };

    return (
        <div className='header'>
            <Link to='/' className='logo-container'>
                <GiQueenCrown className='logo'/>
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/shop'>CONTACT</Link>
                {currentUser ?
                <div className='option' onClick={handleClick}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    //state here is the top level rootReducer
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);