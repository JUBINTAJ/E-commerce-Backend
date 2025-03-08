import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";
import User from "../model/userModels.js";

export const loginadmin = async (email, password) => {
    const adminUser = await User.findOne({ email, role: "admin" });

    if (!adminUser) {
        throw new CustomError("Invalid email or password", 400);
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
        throw new CustomError("Invalid email or password", 400);
    }

    if (adminUser.isBlocked) {
        throw new CustomError("Your admin account is blocked. Contact support.", 403);
    }

    return adminUser;
};

