import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export  const verifyJWT = asyncHandler( async (req ,res, next) =>{

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
    
        if(!token){
            throw new ApiError(401, "Unautorized request")
        }
    
        const decodedToken =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken")
    
        if(!user){
            throw new ApiError(401, " Invalid Acess Token")
        }
        req.user = user;
        next()
    
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid Access")
    }
})