const OrderLaundry = require('../models/OrderLaundry');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, serviceType, weight } = req.body;
    const pricePerKg = parseInt(process.env.PRICE_PER_KG) || 8000;
    const price = weight * pricePerKg;
    
    const order = new OrderLaundry({
      customerName,
      serviceType,
      weight,
      price
    });

    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      data: savedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await OrderLaundry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await OrderLaundry.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await OrderLaundry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const order = await OrderLaundry.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
