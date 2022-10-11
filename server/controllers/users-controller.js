const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

// Get all users.
const getUsers = async (req, res, next) => {
  let users;
  try {
    // Use find and specify to return all fields except password.
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('Could not get users.', 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// Create a new user.
const signUp = async (req, res, next) => {
  // Validate input first.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  const { name, email, password } = req.body;

  // Check if user exists already.
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    // Something whent wrong connecting to the database.
    const error = new HttpError('Could not sign up.', 500);
    return next(error);
  }

  // Found a user with this email.
  if (existingUser) {
    const error = new HttpError('User exists already. Please login.', 422);
    return next(error);
  }

  // Encrypt the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could not create user. Please try again.', 500);
    return next(error);
  }

  // Create a new user document from schema.
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  // Save new user.
  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError('Could not create user. Please try again.', 500);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_KEY, { expiresIn: '1h' });
  } catch (err) {
    const error = new HttpError('Could not create user. Please try again.', 500);
    return next(error);
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email, token });
};

// Log user in with email and password
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists.
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    // Something whent wrong connecting to the database.
    const error = new HttpError('Could not log in.', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Invalid credentials. Could not log in.', 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Could not log in. Please check credentials and try again.', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials. Could not log in.', 403);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
  } catch (err) {
    const error = new HttpError('Could not log in. Please try again.', 500);
    return next(error);
  }

  res.json({ userId: existingUser.id, email: existingUser.email, token });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
