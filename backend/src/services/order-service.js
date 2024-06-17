// วันที่ 17-06-67 ส่วนของหน้า admin ค้นหา
// const prisma = require("../models/prisma");

// const orderService = {};

// orderService.getOrdersByUserId = async (userId) => {
//   return prisma.taskOrder.findMany({
//     where: { userId: parseInt(userId, 10) },
//     include: {
//       cart: {
//         include: {
//           cartItem: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       },
//       user: true, // รวมข้อมูลของผู้ใช้ด้วย
//     },
//   });
// };

// module.exports = orderService;
