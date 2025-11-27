import asyncHandler from "../utils/asyncHandlerWrapper.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
// import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, username, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const existingUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists with username or email");
  }

  //   file handling
  // const profileImageLocalPath = req.files?.profileImage?.[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // if (!profileImageLocalPath) {
  //   throw new ApiError(400, "Profile image local file path is required!");
  // }

  // const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // if (!profileImage) {
  //   throw new ApiError(400, "Profile image is required!");
  // }

  const user = await User.create({
    fullName,
    username: username?.trim().toLowerCase(),
    email,
    password,
    // coverImage: coverImage?.url,
    // profileImage: profileImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error generating tokens", error);
  }
};

const userLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const checkedPassword = await user.isPasswordCorrect(password);

  if (!checkedPassword) {
    throw new ApiError(400, "Invalid password");
  }

  // generate tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User LoggedIn Successfully!"
      )
    );
});

const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User loggedOut successfully!"));
});

const rotateRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(400, "Invalid Refresh Token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh Token Expired!");
  }

  const { accessToken, newRefreshToken } = await generateTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed successfully!"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: user }, "Current User fetched successfully!")
    );
});

// const getCurrentUser = asyncHandler(async (req, res) => {
//   return res.status(200).json({
//     statusCode: 200,
//     data: {
//       user: {
//         _id: "12345",
//         fullName: "Test User",
//         username: "testuser",
//         email: "test@example.com",
//         profileImage: "https://via.placeholder.com/150",
//         coverImage: "https://via.placeholder.com/600x200",
//       },
//     },
//     message: "Current User fetched successfully!",
//     success: true,
//   });
// });

export {
  userRegister,
  userLogin,
  userLogout,
  rotateRefreshToken,
  getCurrentUser,
};
