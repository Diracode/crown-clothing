import { createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist'; //allows browser to cache our store now dependending on the configurations we set
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middleWares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

export const persistor = persistStore(store);

// export default { store, persistor };