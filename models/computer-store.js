'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const computerStore = {

  store: new JsonStore('./models/computer-store.json', { computerCollection: [] }),
  collection: 'computerCollection',
  array: 'songs',

  getAllComputers() {
    return this.store.findAll(this.collection);
  },
  getComputer(id) {
    return this.store.findOneBy(this.collection, (computer => computer.id === id));
},

};

export default computerStore;
