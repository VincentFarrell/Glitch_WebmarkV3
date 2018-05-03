'use strict';

const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store');
const accounts = require ('./accounts.js');
const uuid = require('uuid');

const bookmark = {
   index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const bookmarkId = request.params.id;
    logger.debug('Bookmark id = ', bookmarkId);
    if (loggedInUser) {
    const viewData = {
      title: 'Bookmark',
      bookmark: bookmarkStore.getBookmark(bookmarkId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('bookmark', viewData);
    }
    else response.redirect('/');
  },

  deleteBook(request, response) {
    const bookmarkId = request.params.id;
    const bookId = request.params.bookid;
    logger.debug(`Deleting Book ${bookId} from Bookmark ${bookmarkId}`);
    bookmarkStore.removeBook(bookmarkId, bookId);
    response.redirect('/bookmark/' + bookmarkId);
  },

  addBook(request, response) {
    const bookmarkId = request.params.id;
    const bookmark = bookmarkStore.getBookmark(bookmarkId);
    const newBook = {
      id: uuid(),
      title: request.body.title,
      link: request.body.link,
      desc: request.body.desc,
    };
    bookmarkStore.addBook(bookmarkId, newBook);
    response.redirect('/bookmark/' + bookmarkId);
  },
};

module.exports = bookmark;
