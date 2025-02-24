const mongoose=require("mongoose")

const orderSchema = new mongoose.Schema({
    customer: {
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      },
      phone: {
        type: String,
        trim: true
      }
    },
    books: [{
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending'
    }
  }, {
    timestamps: true
  });
  
  const Order = mongoose.model('Order', orderSchema);

  module.exports={Order}