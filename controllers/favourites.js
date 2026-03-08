"use strict";

import logger from "../utils/logger.js";
import computerStore from "../models/computer-store.js";

const favourites = {
  async add(request, response) {
    const productId = request.params.id;
    logger.info(`Add to favourites: ${productId}`);

    try {
      const added = await computerStore.addToFavourites(productId);
      if (added) {
        logger.info(`Product ${productId} added to favourites`);
      } else {
        logger.info(`Product ${productId} not added (not found or already in favourites)`);
      }
    } catch (e) {
      logger.error(e);
    }

  // redirect back to the referring page (if available) so the user isn't transported to favourites
  const referer = request.get('referer');
    let redirectTo = '/';
    if (referer) {
      try {
        // parse full referer URL and use only path + query to avoid open-redirects
        const url = new URL(referer);
        // append a flash param to show a client notification
        url.searchParams.set('flash', added ? 'added' : 'not-added');
        redirectTo = url.pathname + url.search;
      } catch (e) {
        // if parse fails, only use it if it's a relative path
        if (referer.startsWith('/')) {
          redirectTo = referer + (referer.includes('?') ? '&' : '?') + (added ? 'flash=added' : 'flash=not-added');
        }
      }
    }

    response.redirect(redirectTo);
  },

  // JSON API endpoint: add to favourites without redirect (used by AJAX)
  async addApi(request, response) {
    const productId = request.params.id;
    logger.info(`API Add to favourites: ${productId}`);
    try {
      const added = await computerStore.addToFavourites(productId);
      if (added) {
        logger.info(`Product ${productId} added to favourites (API)`);
        return response.json({ added: true, message: 'Product added to favourites!' });
      }
      logger.info(`Product ${productId} not added (not found or already in favourites) (API)`);
      return response.json({ added: false, message: 'Product already in favourites' });
    } catch (e) {
      logger.error(e);
      return response.status(500).json({ added: false, message: 'Server error' });
    }
  },

  async clear(request, response) {
    logger.info('Clearing favourites playlist');
    try {
      await computerStore.clearFavourites();
      logger.info('Favourites cleared');
    } catch (e) {
      logger.error(e);
    }
    // redirect to the favourites page (now under /computer/fav) with a flash flag for a client notification
    response.redirect('/computer/fav?flash=cleared');
  }
};

export default favourites;

