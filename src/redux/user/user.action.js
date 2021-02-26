import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRRENT_USER,
    payload: user
});