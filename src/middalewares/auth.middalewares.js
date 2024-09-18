import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyToken = async (req, _, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized User");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    req.user = user;
    next();
  } catch (e) {
    next(e)
  }
};

export { verifyToken };
