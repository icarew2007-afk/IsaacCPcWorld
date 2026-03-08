'use strict';

import logger from '../utils/logger.js';

import computerStore from '../models/computer-store.js';

const store = {
  createView(request, response) {
    const productId = request.params.id;
    logger.debug(`Product id = ${productId}`);

    const product = computerStore.getComputer(productId);

    const viewData = {
      title: 'Product',
      // provide both names so existing templates/partials keep working
      singleProduct: product,
      singlePlaylist: product,
      isFavourites: product && product.id === 'fav'
    };

    response.render('store', viewData);
  },
};

export default store;
