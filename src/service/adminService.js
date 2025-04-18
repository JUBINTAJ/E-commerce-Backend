import User from "../model/userModels.js";
import CustomError from '../utils/customError.js'
import Order from '../model/orderModel.js'
import Sale from "../model/Salesgraph.js";



export const userBlockService=async(id)=>{
    const userDetails=await User.findById(id)
    if(!userDetails){
        throw new CustomError("user not found",400)
    }
    userDetails.isBlocked=!userDetails.isBlocked; 
    await userDetails.save() 
    return userDetails;
}



export const getAllUserServices=async(limit,skip)=>{
    const usersList=await User
    .find({role:{$ne:"admin"}})
    .skip(skip)
    .limit(limit)
    const totalUsers=await User.countDocuments({role:{$ne:"admin"}});
    return {usersList,totalUsers}
}





export const singleUserService=async(id)=>{
    const users=await User.findById(id)
    if(!users)
        throw new CustomError("user not found",400)
    else return users;
}




export const getAllOrderService=async(id)=>{
  const orderdata=await Order.find()
  return orderdata
}




export const getProfitService=async()=>{
    const result=await Order.aggregate([{$group:{_id:null,totalRevenue:{$sum:"$total"}}}])
    return result;
}




export const getTotalProductsPurchasedServices=async()=>{
    const result=await Order.aggregate([
        {$unwind:"$items"},  
        {$group:{_id:null,totalProductsPurchased:{$sum:"$items.quantity"}}}
    ])
    return result;
}


export const getMonthlySales = async () => {
    try {
      const sales = await Sale.aggregate([
        {
          $group: {
            _id: { $month: '$createdAt' },
            totalSales: { $sum: '$amount' },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
      return sales;
    } catch (error) {
      throw error;
    }
  };