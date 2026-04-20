'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import computerStore from "../models/computer-store.js";
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");

    if (loggedInUser) {
      const viewData = {
        title: 'PC World',
        fullname: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
        computers: computerStore.getAllComputers ? computerStore.getAllComputers() : (computerStore.getComputers ? computerStore.getComputers() : []),
        apps: appStore.getAllApps ? appStore.getAllApps() : (appStore.getApps ? appStore.getApps() : []),
      };
      response.render('start', viewData);
    } else {
      response.redirect('/');
    }
  },

};

export default start;
