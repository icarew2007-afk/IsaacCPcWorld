"use strict";
import logger from "../utils/logger.js";
import computerStore from "../models/computer-store.js";
import accounts from './accounts.js';
const stats = {
    createView(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);

      if (loggedInUser) {
        logger.info("Stats page loading!");

        // app statistics calculations for computer store
        const computers = computerStore.getAllComputers ? computerStore.getAllComputers() : computerStore.getAll();

        const numComputers = computers.length;

        const totalStock = computers.reduce((sum, c) => sum + (c.quantity || 0), 0);

        const totalValue = computers.reduce((sum, c) => sum + ((c.price || 0) * (c.quantity || 0)), 0);

        const averagePrice = numComputers > 0
          ? (computers.reduce((sum, c) => sum + (c.price || 0), 0) / numComputers).toFixed(2)
          : "0.00";

        const prices = computers.map(c => c.price || 0);
        const highestPrice = prices.length > 0 ? Math.max(...prices) : 0;
        const mostExpensive = computers.filter(c => (c.price || 0) === highestPrice).map(c => c.name || c.model || c.title);

        const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const cheapest = computers.filter(c => (c.price || 0) === lowestPrice).map(c => c.name || c.model || c.title);

          const users = userStore.getAllUsers();
          const numUsers = users ? users.length : 0;

          const statistics = {
            displayNumComputers: numComputers,
            displayTotalStock: totalStock,
            displayAveragePrice: averagePrice,
            displayTotalValue: totalValue.toFixed ? totalValue.toFixed(2) : totalValue,
            highestPrice,
            mostExpensive,
            lowestPrice,
            cheapest,
            displayNumUsers: numUsers
          };

        const viewData = {
          title: "Computer Store Statistics",
          stats: statistics,
          fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
        };

        response.render("stats", viewData);
      } else {
        response.redirect('/');
      }
    },

};

export default stats;
