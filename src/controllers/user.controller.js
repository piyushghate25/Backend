import { asyncHandler } from "../utilities/asyncHandler.js";
import {ApiError} from "../utilities/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utilities/cloudinary.js"
import {ApiResponse} from "../utilities/ApiResponse.js"


const registerUser = asyncHandler( async (req, res) => {
    //get user details from frontend
    //validation -not empty
    //check if user already exists:username,email
    //check for images ,check for avatar
    //upload them to cloudinary , avatar
    //create user object - create entry in db
    //remove password and refresh token field from respornse
    //check for user creation
    // return respone

    const {fullName , email , username , password} = req.body
    console.log("email" , email)

    if(
        [fullName , email , username , password].some((field) => field?.trim()=== "")
    ){
        throw new ApiError(400 , "Please fill all fields")
    }

    const existedUser = User.findOne({
        $or: [{ username} , { email }]
    })

    if(existedUser) {
        throw new ApiError(409 , "User with email or username aleready exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        fullName,
        email,
        username : username.toLowerCase(),
        password,
        avatar : avatar.url,
        coverImage : coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500 , "Failed to create user while registering")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser , "User registered successfully")
    )

} )


export {
    registerUser,
}