import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body


        if (!fullName || !email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new ApiError(400, "user already exist")
        }

        const user = await User.create({
            fullName,
            email,
            password,
            role: role || "user"
        })


        if (!user) {
            throw new ApiError(400, "Something went wrong while registring the user")
        }

        return res.status(201).json(
            new ApiResponse(200, user, "User registered successfully")
        )
    } catch (error) {
        console.log("Internal server error: ", error)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const cookieOptions = {
        httpOnly: false,   // ✅ Set to false so frontend can read cookies
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",   // ✅ Set to "Lax" instead of "None" for better compatibility
        path: "/",         // ✅ Ensure cookies are available across the site
    };

    // Set Access Token (expires in 15 minutes)
    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
    });

    // Set Refresh Token (expires in 7 days)
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
        .status(201)
        .json(new ApiResponse(200, {
            user, loggedInUser, accessToken, refreshToken
        }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res
        .status(201)
        .json(new ApiResponse(200, user, "user fetched successfully"))
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            throw new ApiError(400, "no user  found")
        }

        return res
            .status(201)
            .json(new ApiResponse(200, users, "Users fetched successfully"))
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Internal server error")
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    getAllUsers
}