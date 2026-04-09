'use strict';

import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger.js";
import computerStore from "../models/computer-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const searchTerm = request.query.searchTerm || "";

    const computers = searchTerm
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
      computers: sortField ? sorted : computers,
      search: searchTerm,
      titleSelected: request.query.sort === "title",
      productsSelected: request.query.sort === "products",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    logger.debug(viewData.computers);

    response.render("dashboard", viewData);
  },


  addCategory(request, response) {
    const newCategory = {
      id: uuidv4(),
      title: request.body.title,
      products: [],
    };
    computerStore.addComputer(newCategory.id, newCategory);
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
