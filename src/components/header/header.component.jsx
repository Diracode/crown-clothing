import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';


import { HeaderContainer, LogoContainer, LogoImage, OptionContainer,/* OptionDiv,*/ OptionLink } from './header.styles';

const Header = ({currentUser, hidden, signOutStart}) => {
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <LogoImage/>
            </LogoContainer>
            <OptionContainer>
                <OptionLink to='/shop'>SHOP</OptionLink>
                <OptionLink to='/shop'>CONTACT</OptionLink>
                {currentUser ?
                /*
                * we can specify what type of element we want a styled
                * component to be using the "as=''" for elements and "as={}" for components
                * as shown below (here we want a link styled component to be a div)
                 */
                <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionContainer>
            {
                hidden
                ? null
                : <CartDropdown />
            }
        </HeaderContainer>
    )
};

const mapStateToProps = createStructuredSelector({
    //state here is the top level rootReducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);