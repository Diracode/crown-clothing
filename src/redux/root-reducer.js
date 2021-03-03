import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // this imports localStorage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer'; 

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //an array containing the string names of any of d reducer we want to store
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);