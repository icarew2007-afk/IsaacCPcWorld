"use strict";
import logger from "../utils/logger.js";
import computerStore from "../models/computer-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const computer = computerStore.getAllComputers();

    let numComputers = computer.length;
    let numProducts = computer.reduce((total, computer) => total + computer.products.length, 0);
    let average = numComputers > 0 ? (numProducts / numComputers).toFixed(2) : 0;

    // Favourites stats
    const favourites = computerStore.getComputer('fav');
    const favProducts = favourites && Array.isArray(favourites.products) ? favourites.products : [];
    const numFavourites = favProducts.length;

    const statistics = {
      displayNumComputers: numComputers,
      displayNumProducts: numProducts,
      displayAverage: average,
      displayNumFavourites: numFavourites,
      favouriteProducts: favProducts
    };

    const viewData = {
      title: "Computer Store App Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);
  },
};

export default stats;
