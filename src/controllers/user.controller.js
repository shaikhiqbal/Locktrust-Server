import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../modules/user.module.js";

const genrateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while genrating Refresh and Access tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email: emailId, password, mobileNum } = req.body;

  if (
    [firstName, lastName, emailId, password, mobileNum].some(
      (value) => value.trim() == ""
    )
  )
    throw new ApiError(400, "All Field Must Be Required.");

  const isUserExist = await User.findOne({
    $or: [{ firstName }, { emailId }],
  });

  if (isUserExist) throw new ApiError(409, "User Already Exists.");

  const user = await User.create({
    firstName,
    lastName,
    emailId,
    password,
    mobileNum,
    userType: 1,
  });
  const isUserCreated = await User.findOne({ _id: user?.id }).select(
    "-password -refreshToken"
  );

  if (!isUserCreated) new ApiError(500, "Unable To Create User");

  res
    .status(201)
    .json(new ApiResponse(201, isUserCreated, "successfully user created"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email: emailId, password } = req.body;

  if (!emailId || !password) throw new ApiError(409, "All Field Required");

  const isUserHave = await User.findOne({ emailId });

  console.log({isUserHave})

  if (!isUserHave) throw new ApiError(404, "user Not Found");

  const isPasswordCorrect = await isUserHave.isPasswordCorrect(password);

  if (!isPasswordCorrect) throw new ApiError(400, "Invalid Password");

  const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
    isUserHave?._id
  );

  const accessableUser = await User.findById(isUserHave?._id).select("-password ")



  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          userData: accessableUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
  