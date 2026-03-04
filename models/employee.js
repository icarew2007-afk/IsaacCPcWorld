'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const getAppInfo = {

  store: new JsonStore('./models/employee.json', { info: {} }),
  collection: 'employee',
 

  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default getAppInfo;