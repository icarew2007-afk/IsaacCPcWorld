'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import store from './controllers/store.js';
import favourites from './controllers/favourites.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/computer/:id', store.createView);
router.get('/favourites/add/:id', favourites.add);
router.post('/api/favourites/add/:id', favourites.addApi);
router.get('/favourites/clear', favourites.clear);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
