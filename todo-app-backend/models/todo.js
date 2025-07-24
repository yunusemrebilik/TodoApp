const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongDB');
  })
  .catch(error => {
    console.error('erorr connectiong to MongoDB', error.message);
  });

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

todoSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Todo', todoSchema);