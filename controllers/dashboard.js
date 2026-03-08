'use strict';

import logger from "../utils/logger.js";
import computerStore from "../models/computer-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Isaac's PC World Dashboard",
      computers: computerStore.getAllComputers()
    };
    
    logger.debug(viewData.computers);
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;
