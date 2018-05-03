'use strict';

const accounts = require ('./accounts.js');
const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store');
const pictureStore = require('../models/picture-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Bookmark Dashboard',
      bookmarks: bookmarkStore.getUserBookmarks(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      album: pictureStore.getAlbum(loggedInUser.id),
    };
    logger.info('about to render', bookmarkStore.getAllBookmarks());
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },

  deleteBookmark(request, response) {
    const bookmarkId = request.params.id;
    logger.debug(`Deleting Bookmark ${bookmarkId}`);
    bookmarkStore.removeBookmark(bookmarkId);
    response.redirect('/dashboard');
  },

   addBookmark(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newBookmark = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      books: [],
    };
    logger.debug('Creating a new Bookmark', newBookmark);
    bookmarkStore.addBookmark(newBookmark);
    response.redirect('/dashboard');
  },
  
  uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.files.picture, function () {
      response.redirect('/dashboard');
    });
  },
  
  deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/dashboard');
  },

  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
