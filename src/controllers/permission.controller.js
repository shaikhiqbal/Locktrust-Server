import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Permission, allowedActions } from "../modules/permission.module.js";

const createPermission = asyncHandler(async (req, res) => {
  const { module, methods } = req.body;

  if (!module || !methods) throw new ApiError(400, "Bad Request");

  if (methods.some((action) => !allowedActions.includes(action.trim())))
    throw ApiError(400, "Invalid Action");

  const permission = await Permission.findOne({ module });

  if (permission) throw new ApiError(400, "Already Exist");

  const isPermissionCreate=await Permission.save({module,methods})
  if(!isPermissionCreate)throw


  

});
