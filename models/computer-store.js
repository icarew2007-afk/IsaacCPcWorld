'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const computerStore = {

  store: new JsonStore('./models/computer-store.json', { computerCollection: [] }),
  collection: 'computerCollection',
  array: 'products',

  getAllComputers() {
    return this.store.findAll(this.collection);
  },
  getComputer(id) {
    return this.store.findOneBy(this.collection, (computer => computer.id === id));
},

  async addToFavourites(productId) {
    // find the product anywhere in the collection
    const all = this.getAllComputers();
    let foundProduct = null;
    if (Array.isArray(all)) {
      for (const c of all) {
        if (Array.isArray(c[this.array])) {
          const p = c[this.array].find(i => i.id === productId);
          if (p) { foundProduct = p; break; }
        }
      }
    }

    if (!foundProduct) return null;

    // ensure favourites playlist exists
    let fav = this.getComputer('fav');
    if (!fav) {
      // create fav playlist
      const favObj = { id: 'fav', title: 'Favourites', [this.array]: [] };
      await this.store.addCollection(this.collection, favObj);
      fav = this.getComputer('fav');
    }

    // avoid duplicates
    const exists = fav[this.array].some(i => i.id === productId);
    if (exists) return null;

    // add to fav
    await this.store.addItem(this.collection, 'fav', this.array, foundProduct);
    return foundProduct;
  },

  async clearFavourites() {
    // find favourites playlist
    const fav = this.getComputer('fav');
    if (!fav) return false;
    // create a new fav object with an empty products array
    const newFav = { id: 'fav', title: fav.title || 'Favourites', [this.array]: [] };
    await this.store.editCollection(this.collection, 'fav', newFav);
    return true;
  },

};

export default computerStore;
