import { asyncHandler } from "../utilities/asyncHandler.js";


const registerUser = asyncHandler( async (req, res) => {
    res.status(500).json({
        message: "chai aur code"
    })
} )


export {
    registerUser,
}