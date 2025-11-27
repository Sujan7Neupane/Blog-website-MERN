import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandlerWrapper.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(400, "Unauthorized request!");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(400, "Invalid access token");
  }

  req.user = user;
  next();
});

export default verifyJWT;
