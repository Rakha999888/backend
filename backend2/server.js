/**
 * @fileoverview File utama untuk server Express.js
 * @description Konfigurasi dan inisialisasi server API untuk manajemen pesanan UMKM
 * @version 1.0.0
 * @license MIT
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

/**
 * Express application
 * @type {import('express').Express}
 */
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/orders', orderRoutes);

/**
 * Health check endpoint
 * @name GET /health
 * @function
 * @memberof module:server
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Status API
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

/**
 * Handle 404 Not Found
 * @name USE /*
 * @function
 * @memberof module:server
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Error response
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

/**
 * Error handling middleware
 * @name USE /*
 * @function
 * @memberof module:server
 * @param {Error} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Object} Error response
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
