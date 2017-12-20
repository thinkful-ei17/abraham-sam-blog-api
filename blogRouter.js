'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++){
    const field = requiredFields[i];
    if (!(field in req.body)){
      const message = `Missing ${field} from blog post input`;
      console.error(message);
      res.status(400).send(message);
    }
  }
  const { title, content, author, publishDate } = req.body;
  const entry = BlogPosts.create(title, content, author, publishDate);
  res.status(201).json(entry); 
});

module.exports = router;