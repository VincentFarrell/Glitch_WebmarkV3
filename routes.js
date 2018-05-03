'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const bookmark = require('./controllers/bookmark.js');
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);

router.post('/dashboard/uploadpicture', dashboard.uploadPicture);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletebookmark/:id', dashboard.deleteBookmark);
router.post('/dashboard/addbookmark', dashboard.addBookmark);

router.get('/bookmark/:id', bookmark.index);
router.get('/bookmark/:id/deletebook/:bookid', bookmark.deleteBook);
router.post('/bookmark/:id/addbook', bookmark.addBook);

router.get('/about', about.index);

module.exports = router;