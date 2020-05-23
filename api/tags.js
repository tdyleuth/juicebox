const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();

});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();


    res.send({
        tags
    });
});


tagsRouter.get('/:tagName/posts', async(req, res, next) => {
  const {tagName} = req.params;
  const posts = await getPostsByTagName(tagName);
  try {
    if (posts) {
      res.send({
        posts
      })
    } else {
      next({
        name: 'NoPostsForTagsError',
        message: 'Did not find any posts for this tag'
      });
    }
  } catch ({name, message}) {
    next({name, message});
  }
})

module.exports = tagsRouter;