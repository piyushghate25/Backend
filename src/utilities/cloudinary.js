import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { response } from "express";
import fs from 'fs'



// Configuration
cloudinary.config({
    cloud_name: 'CLOUDINARY_CLOUD_NAME',
    api_key: 'CLOUDINARY_API_KEY',
    api_secret: 'CLOUDINARY_API_SECRET' // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath , { resource_type : "auto"})
        //file has been uploaded successfull
        console.log("File is uploaded on cloudinary" , response.url); 
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally save  temporary file as tje upload operation got failed 
    }
}

export {uploadOnCloudinary}