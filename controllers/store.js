'use strict';

import logger from '../utils/logger.js';
import accounts from './accounts.js';
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
    const categoryId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Category id = ' + categoryId);

    const category = computerStore.getComputer(categoryId);
    const viewData = {
      title: 'Computer Category',
      category: category,
      singlePlaylist: category, // for compatibility with existing template
      fullname: loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : null,
    };

    response.render('store', viewData);
  },


  addProduct(request, response) {
    const categoryId = request.params.id;
    const category = computerStore.getComputer(categoryId);
    let imageUrl = null;
    if (request.files && request.files.image) {
      const imageFile = request.files.image;
      const path = `public/${imageFile.name}`;
      // Save the file to the public directory
      imageFile.mv(path, function(err) {
        if (err) {
          logger.error('Image upload failed:', err);
        }
      });
      imageUrl = `/${imageFile.name}`;
    }
    const newProduct = {
      id: uuidv4(),
      title: request.body.product,
      brand: request.body.brand,
      image: imageUrl
    };
    if (category && Array.isArray(category.products)) {
      category.products.push(newProduct);
      computerStore.store.db.write();
    }
    response.redirect('/computer/' + categoryId);
  },
deleteProduct(request, response) {
    const productId = request.params.id;
    logger.debug(`Deleting Product ${productId}`);
    computerStore.removeProduct(productId);
    response.redirect('/dashboard');
},
};




export default store;
  