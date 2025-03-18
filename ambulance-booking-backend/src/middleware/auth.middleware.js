import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request - No token provided");
        }

        // Verify JWT
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken?._id) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Fetch user details
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);

        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid token");
        } else if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token has expired");
        }

        throw new ApiError(401, error?.message || "Authentication failed");
    }
});
