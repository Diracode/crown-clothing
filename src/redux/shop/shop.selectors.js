import { createSelector } from 'reselect';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    //render an empty array if collections is null
    collections => collections ?
        Object.keys(collections)
        .map(key => collections[key]) :
        []
);

export const selectCollection = collectionUrlParam => 
createSelector(
    [selectCollections],
    collections => (collections ?
        collections[collectionUrlParam] :
        null)
);