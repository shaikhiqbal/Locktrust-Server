import mongoos from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const { Schema } = mongoos;

// Define the userRoles schema
const userRolesSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNum: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    userType: {
      type: Number,
      default: 1,
    },

    refreshToken: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  console.log({ password, p: this.password });
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.emailId,
      fullName: this.firstName,
      username: this.lastName,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};

export const User = mongoos.model("User", userSchema);
