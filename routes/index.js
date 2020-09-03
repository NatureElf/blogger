var express = require('express');
var router = express.Router();

/* Setup Controllers */
const homeController = require('../controllers/home');
const blogController = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', homeController.showHome);
router.get('/blogs', blogController.showBlogs);
router.get('/blogs/add', blogController.addBlog);


module.exports = router;
