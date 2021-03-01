import { createSelector } from 'reselect';

const selectCart = state => state.cart;

//createSelector takes in 2 args: 1st is a collection e.g Array; 2nd is a function
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
     cartItems.reduce(
         (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity, 0)
);