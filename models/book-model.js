const mongoose=require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },

    image:{
      type:String
    },

    category: {
      type: String,
      trim: true,
      
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    content:{
      type: String,
      
    },
    publishedDate: {
      type: Date,
      default: Date.now(),
    }
  }, {
    timestamps: true
  });
  
  const Book = mongoose.model('Book', bookSchema);
  module.exports={Book}