'use strict';

import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger.js";
import computerStore from "../models/computer-store.js";
import accounts from './accounts.js';

const dashboard = {

  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      // Use computerStore for categories (computers)
      let computers = searchTerm
        ? computerStore.searchComputer(searchTerm)
        : computerStore.getAllComputers();

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = computers;

      if (sortField) {
        sorted = computers.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }
          if (sortField === "products") {
            return (a.products.length - b.products.length) * order;
          }
          return 0;
        });
      }

      const viewData = {
        title: "Product Categories Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        computers: sortField ? sorted : computers,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        productsSelected: request.query.sort === "products",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };

      logger.info('about to render', viewData.computers);
      response.render('dashboard', viewData);
    } else {
      response.redirect('/');
    }
  },



    addCategory(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);
      if (!loggedInUser) {
        response.redirect('/');
        return;
      }

      logger.debug(`Adding Category for user ${loggedInUser.id}`);
      const timestamp = new Date();

      const newCategory = {
        userid: loggedInUser.id,
        id: uuidv4(),
        title: request.body.title,
        products: [],
        date: timestamp
      };

      computerStore.addComputer(newCategory);
      response.redirect('/dashboard');
    },


deleteCategory(request, response) {
    const categoryId = request.params.id;
    logger.debug(`Deleting Category ${categoryId}`);
    computerStore.removeComputer(categoryId);
    response.redirect("/dashboard");
},


};

export default dashboard;
