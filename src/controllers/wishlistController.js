import asyncHandler from "../middlewares/asyncHandler";
import { addProductToWishlist, getAllWishlistService, removeWishlistService } from "../service/wishlistService.js";
import { STATUS } from "../utils/constant";



export const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;
    const wishListProduct = await addProductToWishlist(productId, userId);

    if (wishListProduct) {
        res.status(200).json({
            status: STATUS.SUCCESS,
            message: "product added  to wishlist successfully",
        });
    }
});



export const removeSingleWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    await removeWishlistService(userId, productId);
    res.json({
        status: STATUS.SUCCESS,
        message: "product removed from favourites successfully",
    });
});





export const getAllWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userWishlist = await getAllWishlistService(userId)
    if (!userWishlist || userWishlist.wishlist.length === 0) {
        res.status(200).json({
            status: STATUS.SUCCESS,
            message: 'wishlist is empty'
        })
    } else {
        res.status(200).json({
            status: STATUS.SUCCESS,
            message: userWishlist.wishlist
        })
    }
})