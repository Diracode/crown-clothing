import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import CollectionPage from './collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'

const mapStateToProps = createStructuredSelector({
    //Becos we will pass in this property in2 WithSpinner, we have to set d property to be named with the same name the spinner is expecting.
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;