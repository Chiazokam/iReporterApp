const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const middleware = {
  postValidation(req, res, next) {
    const { title, createdOn, location, comment, image, video } = req.body;
    const errors = {};
    if (!title || !createdOn || !location || !comment) {
      if (!title) {
        errors['title'] = 'Missing title';
      }
      if (!createdOn) {
        errors['createdOn'] = 'Missing date';
      }
      if (!location) {
        errors['location'] = 'Missing location';
      }
      if (!comment) {
        errors['comment'] = 'Missing comment';
      }
      if (errors) {
        return res.status(400).send({ error: errors });
      }
    }
    next();
  },

  editCommentValidation(req, res) {

  },

  editLocationValidation(req, res) {

  },
};

export default middleware;
