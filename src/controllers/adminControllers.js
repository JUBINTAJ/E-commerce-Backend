import asyncHandler from "../middlewares/asyncHandler.js";
import {getAllOrderService,getAllUserServices,getProfitService,getTotalProductsPurchasedServices,singleUserService, userBlockService,getMonthlySales} from "../service/adminService.js";
import { STATUS } from "../utils/constant.js";





export const userBlock = asyncHandler(async (req, res) => {
       const { id } = req.params;
       const user = await userBlockService(id);

       const message = user.isBlocked ? "User is blocked" : "User is unblocked";

      res.json({
      status: STATUS.SUCCESS,
      message,
  });
});





export const allUser = asyncHandler(async (req, res) => {
  const { page } = req.query; 
  const pageInt = parseInt(page, 10) || 1;
  const limit = 10;
  const skip = (pageInt - 1) * limit;
  const { usersList, totalUsers } = await getAllUserServices(limit, skip);

  const message = usersList.length ? "User list" : "no user found";
  const totalPages = Math.ceil(totalUsers / limit);

  res.json({
    status: STATUS.SUCCESS,
    message,
    data: {
      users: usersList,
      totalUsers,
      totalPages,
      curreentPage: pageInt,
    },
  });
});





export const singleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await singleUserService(id);
  res.json({
    status: STATUS.SUCCESS,
    message: "user details...",
    user,
  });
});





export const orderDetails = asyncHandler(async (req, res) => {
  const orderList = await getAllOrderService();
  res.json({
    status: STATUS.SUCCESS,
    message: "order list....",
    order: orderList,
  });
});







export const userCount = asyncHandler(async (req, res) => {
  const { totalUsers } = await getAllUserServices(10, 1);
  const message = totalUsers ? "User list" : "no users found";
  res.json({
    status: STATUS.SUCCESS,
    message: message,
    totalUsers,
  });
});





export const Profit = asyncHandler(async (req, res) => {
  const totalprofit = await getProfitService();
  const total = totalprofit.length > 0 ? totalprofit[0].totalRevenue : 0;
  res.json({
    status: STATUS.SUCCESS,
    message: "total revenue",
    total,
  });
});





export const totalProductsPurchased = asyncHandler(async (req, res) => {
  const totalProducts = await getTotalProductsPurchasedServices();

  const total =
    totalProducts.length > 0 ? totalProducts[0].totalProductsPurchased : 0;
  res.json({
    status: STATUS.SUCCESS,
    message: "total products purchased",
    total,
  });
});



export const monthlySales = async (req, res) => {
  try {
    const salesData = await getMonthlySales();
    res.status(200).json({
      success: true,
      data: salesData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      err,
    });
  }
};


