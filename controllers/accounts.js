'use strict';
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('bookmark', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

   authenticate (request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const password = userstore.getUserByEmail(request.body.password);
    if (request.body.email == user.email && request.body.password == user.password) {
      response.cookie('bookmark', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } 
      else if (request.body.email != user.email) {
       logger.info("Email is not registered with an Account");
       response.redirect('/login');
    }
     else if (request.body.password != user.password) {
      logger.info("Incorrect Password");
      response.redirect('/login');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.bookmark;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;