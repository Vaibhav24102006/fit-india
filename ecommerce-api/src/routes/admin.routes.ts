import { Router } from 'express';
import { ProductModel } from '../models/product.model';
import { OrderModel } from '../models/order.model';

const router = Router();

// Get all orders (admin only)
router.get('/orders', async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Update order status (admin only)
router.patch('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
});

// Create new product (admin only)
router.post('/products', async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Update product (admin only)
router.put('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete product (admin only)
router.delete('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [totalOrders, totalProducts, recentOrders] = await Promise.all([
      OrderModel.countDocuments(),
      ProductModel.countDocuments(),
      OrderModel.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      totalOrders,
      totalProducts,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
});

export const adminRoutes = router; 