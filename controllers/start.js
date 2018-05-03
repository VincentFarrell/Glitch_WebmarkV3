'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');

const start = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('start rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'Welcome to Webmark Manager V3',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

module.exports = start;
