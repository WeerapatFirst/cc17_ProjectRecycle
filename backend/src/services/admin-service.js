const prisma = require("../models/prisma");

const adminService = {};

// ฟังก์ชันการดึงข้อมูลคำสั่งซื้อทั้งหมด
adminService.getAllOrders = async () => {
  return prisma.taskOrder.findMany({
    include: {
      cart: {
        include: {
          cartItem: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};

// ฟังก์ชันการอัปเดตคำสั่งซื้อ
adminService.updateOrder = async (orderId, data) => {
  return prisma.taskOrder.update({
    where: { id: parseInt(orderId, 10) },
    data,
  });
};

// ฟังก์ชันการลบคำสั่งซื้อ
adminService.deleteOrder = async (orderId) => {
  return prisma.taskOrder.delete({
    where: { id: parseInt(orderId, 10) },
  });
};

module.exports = adminService;
