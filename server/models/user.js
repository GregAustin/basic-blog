const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //'Unique' indexes email to speed up future queries.
  password: { type: String, required: true, minLength: 6 },
  blogs: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Blog' }], // Array because there can be multiple blogs per user
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
