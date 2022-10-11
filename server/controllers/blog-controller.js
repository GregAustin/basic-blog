const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Blog = require('../models/blog');
const User = require('../models/user');

// Get a blog with a given ID
const getBlogById = async (req, res, next) => {
  const blogId = req.params.bid;
  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    // Something goes wrong retrieving data from DB.
    const error = new HttpError('Something went wrong. Could not find blog.', 500);
    return next(error);
  }

  if (!blog) {
    // No blog ID in database
    const error = new HttpError('Blog with that ID does not exist.', 404);
    return next(error);
  }

  // Transform from Mongoose object to regular object. Getters 'true' to return 'id' property.
  res.json({ blog: blog.toObject({ getters: true }) });
};

// Get a blog for a given User ID
const getBlogsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let foundBlogs;

  try {
    foundBlogs = await Blog.find({ creator: userId });
  } catch (err) {
    // Something goes wrong retrieving data from DB.
    const error = new HttpError('Something went wrong. Could not find blogs for that user.', 500);
    return next(error);
  }

  if (!foundBlogs || !foundBlogs.length) {
    return next(new HttpError('Could not find any blogs for user with that id.', 404));
  }

  // Transform from Mongoose object to regular object. Getters 'true' to return 'id' property.
  foundBlogs = foundBlogs.map((blog) => blog.toObject({ getters: true }));

  res.json({ blogs: foundBlogs });
};

// Create a new blog
const createBlog = async (req, res, next) => {
  // Validate input first.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  const { title, text } = req.body;

  // Create a new blog document from schema.
  const newBlog = new Blog({
    title,
    text,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError('Could not create blog. Please try again.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for that id', 404);
    return next(error);
  }

  // Save new blog.
  try {
    // Use a session to carry out multiple actions
    const sess = await mongoose.startSession();
    sess.startTransaction(); // Start a transaction.
    await newBlog.save({ session: sess }); // Save the new blog (as part of this session).
    user.blogs.push(newBlog); // Add new blog to users. (Mongoose only adds the blog's id).
    await user.save({ session: sess }); // Save the updated user.
    await sess.commitTransaction(); // End the transaction. Changes are saved to database at this point only.
  } catch (err) {
    const error = new HttpError('Could not create blog. Please try again.', 500);
    return next(error);
  }

  res.status(201).json({ blog: newBlog.toObject({ getters: true }) });
};

// Update a blog document with a new title and text.
const updateBlog = async (req, res, next) => {
  // Validate input first.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  const { title, text } = req.body;
  const blogId = req.params.bid;

  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    // Something goes wrong retrieving data from DB.
    const error = new HttpError('Something went wrong. Could not update blog.', 500);
    return next(error);
  }

  if (!blog) {
    // No blog ID in database
    const error = new HttpError('Blog with that ID does not exist.', 404);
    return next(error);
  }

  // Blog is mongoose object here so we need to conver to string.
  if (blog.creator.toString() !== req.userData.userId) {
    // Wrong user trying to edit blog
    const error = new HttpError('You are not authorized to edit this blog.', 401);
    return next(error);
  }

  // Will not be empty due to validation.
  blog.title = title;
  blog.text = text;

  // Save updated blog.
  try {
    await blog.save();
  } catch (err) {
    const error = new HttpError('Something went wrong. Could not update blog.', 500);
    return next(error);
  }

  res.status(200).json({ blog: blog.toObject({ getters: true }) });
};

const deleteBlog = async (req, res, next) => {
  const blogId = req.params.bid;

  let blog;
  try {
    // 'populate' allows us to defer to a document stored in another collection if there is a relation.
    blog = await Blog.findById(blogId).populate('creator');
  } catch (err) {
    // Something goes wrong retrieving data from DB.
    const error = new HttpError('Something went wrong. Could not delete blog.', 500);
    return next(error);
  }

  if (!blog) {
    // No blog ID in database
    const error = new HttpError('Blog with that ID does not exist.', 404);
    return next(error);
  }

  // Blog.creator is full user object here so we can access id.
  if (blog.creator.id !== req.userData.userId) {
    // Wrong user trying to edit blog
    const error = new HttpError('You are not authorized to delete this blog.', 401);
    return next(error);
  }

  // Remove the blog to be deleted
  try {
    // Use a session to carry out multiple actions
    const sess = await mongoose.startSession();
    sess.startTransaction(); // Start a transaction.
    await blog.remove({ session: sess }); // Delete the blog.
    blog.creator.blogs.pull(blog); // Remove blog from user.
    await blog.creator.save({ session: sess }); // Save the updated user.
    await sess.commitTransaction(); // End the transaction. Changes are saved to database at this point only.
  } catch (err) {
    const error = new HttpError('Something went wrong. Could not delete blog.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Blog deleted.' });
};

exports.getBlogById = getBlogById;
exports.getBlogsByUserId = getBlogsByUserId;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
