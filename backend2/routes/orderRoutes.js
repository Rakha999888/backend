/**
 * @fileoverview Route handler untuk manajemen pesanan
 * @description Menangani routing untuk operasi CRUD pada pesanan
 * @version 1.0.0
 * @license MIT
 */

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

/**
 * @typedef {Object} Order
 * @property {string} _id - ID unik pesanan
 * @property {string} customerName - Nama pelanggan
 * @property {Array} items - Daftar item pesanan
 * @property {number} total - Total harga pesanan
 * @property {string} status - Status pesanan (pending/processing/completed/cancelled)
 * @property {Date} createdAt - Waktu pembuatan pesanan
 * @property {Date} updatedAt - Waktu terakhir pesanan diupdate
 */

/**
 * @route POST /api/orders
 * @description Membuat pesanan baru
 * @memberof module:routes/orderRoutes
 * @param {Object} req.body - Data pesanan
 * @param {string} req.body.customerName - Nama pelanggan
 * @param {Array} req.body.items - Daftar item pesanan
 * @returns {Order} Pesanan yang baru dibuat
 */
/**
 * @route GET /api/orders
 * @description Mendapatkan daftar semua pesanan
 * @memberof module:routes/orderRoutes
 * @param {Object} req.query - Opsi query
 * @param {string} [req.query.status] - Filter berdasarkan status pesanan
 * @returns {Array<Order>} Daftar pesanan
 */
router.route('/')
  .post(createOrder)
  .get(getOrders);

/**
 * @route GET /api/orders/:id
 * @description Mendapatkan detail pesanan berdasarkan ID
 * @memberof module:routes/orderRoutes
 * @param {string} req.params.id - ID pesanan
 * @returns {Order} Detail pesanan
 */
/**
 * @route PUT /api/orders/:id
 * @description Memperbarui pesanan berdasarkan ID
 * @memberof module:routes/orderRoutes
 * @param {string} req.params.id - ID pesanan
 * @param {Object} req.body - Data yang akan diupdate
 * @returns {Order} Pesanan yang telah diupdate
 */
/**
 * @route DELETE /api/orders/:id
 * @description Menghapus pesanan berdasarkan ID
 * @memberof module:routes/orderRoutes
 * @param {string} req.params.id - ID pesanan
 * @returns {Object} Pesan konfirmasi
 */
router.route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
