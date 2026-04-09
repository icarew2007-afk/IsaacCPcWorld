'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";
import stats from './controllers/stats.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import store from './controllers/store.js';
import favourites from './controllers/favourites.js';
import computerStore from './models/computer-store.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/computer/:id', store.createView);
router.get('/favourites/add/:id', favourites.add);
router.post('/api/favourites/add/:id', favourites.addApi);
router.get('/favourites/clear', favourites.clear);
router.post('/api/computer/add', store.addProduct);
router.post('/dashboard/addcategory', dashboard.addCategory);
router.get('/searchCategory', dashboard.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/sortData', dashboard.createView);
router.get('/stats', stats.createView);
router.get('/computer/:id/deleteproduct/:productid', computerStore.removeProduct);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);

export default router;
