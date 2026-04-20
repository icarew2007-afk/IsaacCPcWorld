'use strict';

import logger from "../utils/logger.js";
import getAppInfo from "../models/employee.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('About page loading!');

    const viewData = {
      title: 'About the Employee App',
      fullname: loggedInUser ? `${loggedInUser.firstName} ${loggedInUser.lastName}` : '',
      appInfo: getAppInfo(),
    };

    if (loggedInUser) {
      response.render('about', viewData);
    } else {
      response.redirect('/');
    }
  },

};

export default about;
