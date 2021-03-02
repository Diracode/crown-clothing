import { createSelector } from 'reselect';

const selectCart = state => state.cart;

//createSelector takes in 2 args: 1st is a collection e.g Array; 2nd is a function
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
     cartItems.reduce(
         (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
     cartItems.reduce(
         (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity, 0)
);