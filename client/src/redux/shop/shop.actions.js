import ShopActionTypes from './shop.types';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';


export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        /**
         * using firestore to update collections
         */
        // const unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot =>{
        //    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //    updateCollections(collectionsMap);
        //    setLoadingState(false);
        // });

        // the con of these .get() method is that it updates only once as oppossed to .onSnapshot() that does live checking
        collectionRef.get().then(snapshot =>{
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
};