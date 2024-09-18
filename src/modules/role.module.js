import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  permission: {
    type: Schema.Types.ObjectId,
    ref: "permission",
  },
});
