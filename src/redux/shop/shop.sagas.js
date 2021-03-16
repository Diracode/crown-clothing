import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchcollectionAsync() {

    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        //Put is used in place of dispatch function to create actions in gemerator functions
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error){
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchcollectionStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchcollectionAsync
    );
}