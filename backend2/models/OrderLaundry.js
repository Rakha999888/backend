const mongoose = require('mongoose');

const orderLaundrySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['Cuci Kering', 'Setrika', 'Cuci Setrika', 'Dry Cleaning'],
    trim: true
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0.1, 'Weight must be greater than 0']
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


orderLaundrySchema.pre('save', function(next) {
  const pricePerKg = parseInt(process.env.PRICE_PER_KG) || 8000;
  this.price = this.weight * pricePerKg;
  next();
});

module.exports = mongoose.model('OrderLaundry', orderLaundrySchema);
