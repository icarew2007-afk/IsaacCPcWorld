'use strict';

import logger from '../utils/logger.js';
import playlistStore from '../models/computer-store.js';
import computerStore from '../models/computer-store.js';

const playlist = {
  createView(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Playlist id = ${playlistId}`);
    
    const viewData = {
      title: 'Playlist',
      singlePlaylist: computerStore.getComputer(playlistId)
    };

  response.render('store', viewData);
  },
};

export default playlist;
