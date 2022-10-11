const express = require('express');
const { check } = require('express-validator');

const blogController = require('../controllers/blog-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/:bid', blogController.getBlogById);

router.get('/user/:uid', blogController.getBlogsByUserId);

// Routes after this will be restricted to authenticated users.
router.use(checkAuth);

router.post(
  '/',
  [check('title').not().isEmpty(), check('title').isLength({ min: 5 }), check('text').not().isEmpty()],
  blogController.createBlog
);

router.patch(
  '/:bid',
  [check('title').not().isEmpty(), check('title').isLength({ min: 5 }), check('text').not().isEmpty()],
  blogController.updateBlog
);

router.delete('/:bid', blogController.deleteBlog);

module.exports = router;
