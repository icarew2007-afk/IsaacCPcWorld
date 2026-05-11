
'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import stats from './controllers/stats.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import store from './controllers/store.js';
import favourites from './controllers/favourites.js';
import accounts from './controllers/accounts.js';

const router = express.Router();

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/computer/:id', store.createView);
router.get('/favourites/add/:id', favourites.add);
router.post('/api/favourites/add/:id', favourites.addApi);
router.get('/favourites/clear', favourites.clear);
router.post('/computer/:id/addproduct', store.addProduct);
router.post('/dashboard/addcategory', dashboard.addCategory);
router.get('/searchCategory', dashboard.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/sortData', dashboard.createView);
router.get('/stats', stats.createView);
router.get('/computer/:id/deleteproduct/:productid', store.deleteProduct);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);
router.post('/computer/:id/editproduct/:productid', store.updateProduct);
router.get('/computer/:id/editproduct/:productid', store.editProduct);

export default router;
