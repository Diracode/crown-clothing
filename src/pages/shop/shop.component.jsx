import React, { useState } from 'react';

import SHOP_DATA from'./shop.data.js';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = () => {
    const [collectionsState, setCollectionsState] = useState(SHOP_DATA);

    return (
        <div className='shop-page'>
        {
            collectionsState.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }
        </div>
    )
};

export default ShopPage;