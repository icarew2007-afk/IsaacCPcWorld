'use strict';

import logger from '../utils/logger.js';

import computerStore from '../models/computer-store.js';
import { v4 as uuidv4 } from 'uuid';

const store = {
  editProduct(request, response) {
    const categoryId = request.params.id;
    const productId = request.params.productid;
    const category = computerStore.getComputer(categoryId);
    const product = category.products.find(p => p.id === productId);
    response.render('editproduct', { categoryId, product });
  },

  updateProduct(request, response) {
    const categoryId = request.params.id;
    const productId = request.params.productid;
    const { title, brand } = request.body;
    computerStore.updateProduct(categoryId, productId, { title, brand });
    response.redirect('/computer/' + categoryId);
  },
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

  addProduct(request, response) {
    const productId = request.params.id;
    const product = computerStore.getComputer(productId);
    const newProduct = {
      id: uuidv4(),
      title: request.body.title,
      artist: request.body.artist,
    };
    computerStore.addProduct(newProduct);
    response.redirect('/computer/' + productId);
},
deleteProduct(request, response) {
    const productId = request.params.id;
    logger.debug(`Deleting Product ${productId}`);
    computerStore.removeProduct(productId);
    response.redirect('/dashboard');
},
};




export default store;
  