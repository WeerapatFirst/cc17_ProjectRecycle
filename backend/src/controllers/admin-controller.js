// วันที่ 14-06-67 admin
const adminService = require("../services/admin-service");

const adminController = {};

adminController.getAllOrders = async (req, res, next) => {
  try {
    const orders = await adminService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

adminController.updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { status, address } = req.body;

  try {
    const updatedOrder = await adminService.updateOrder(orderId, {
      status,
      address,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

adminController.deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    await adminService.deleteOrder(orderId);
    res.status(200).json({ message: "ลบคำสั่งซื้อเรียบร้อย" });
  } catch (error) {
    next(error);
  }
};

module.exports = adminController;
