import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { GiQueenCrown } from 'react-icons/gi';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => {
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
                <CartIcon />
            </div>
            {
                hidden
                ? null
                : <CartDropdown />
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    //state here is the top level rootReducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);