'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import computerStore from "../models/computer-store.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "Welcome to the Isaac's PC World app!",
      info: appStore.getAppInfo(),
      favourites: computerStore.getComputer('fav')
    };
    
    //logger.debug(viewData);
    response.render('start', viewData);   
  },
};

export default start;
