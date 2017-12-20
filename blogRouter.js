'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('Hello World!', 'My first post', 'Thinkful Student');

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

router.delete('/:id', (req, res) => {
  console.log(`Deleted post with id ${req.params.id}`);
  BlogPosts.delete(req.params.id);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for(let i=0; i<requiredFields.length; i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing ${field} from blog post input`;
      console.error(message);
      res.status(400).send(message);
    }
  }

  if(req.params.id !== req.body.id){
    const message = `Request Id ${req.params.id} did not match body id ${req.body.id}`;
    console.error(message);
    res.status(400).send(message);
  }
  const  {title, author, content, publishDate, id}  = req.body;
  const updatedObject = {
    id,
    title, 
    author, 
    content, 
    publishDate
  };

  BlogPosts.update(updatedObject);
  res.status(204).end();
});

module.exports = router;