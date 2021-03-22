import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container.component';
import CollectionPageContainer from '../collection/collection.container.component';


const ShopPage = ({match, fetchCollectionsStart}) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
        /**
         * using render in place of component allows us to pass in a function
         * where the parameters and the function are the parameters the component will
         * receive
         */
        <div className='shop-page'>
            {/* <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>}/>
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>}/> */}
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
        </div>
        //<CollectionPageWithSpinner isLoading={!isCollectionsLoaded}: !isCollectionsLoaded is so in order to always set to true since collections will be null upon initial render of the page b4 d useEffect hook is called
    )};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);