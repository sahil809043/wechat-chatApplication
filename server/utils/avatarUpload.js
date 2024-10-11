// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"

const v2 = require('cloudinary')
const fs = require('fs')

v2.config({
    cloud_name: "dfcdz4hwq",
    api_key: "431627922791939",
    api_secret: "4j_toslz0nxZUDkyPXd_LMeC_4M"
});

const fileUpload = async (localFilepath) => {
    try {
        if (!localFilepath) return null;

        const response = await v2.uploader.upload(localFilepath, {
            resource_type: "auto"
        })

        fs.unlinkSync(localFilepath)

        return response.secure_url

    } catch (error) {
        fs.unlinkSync(localFilepath)
        return null;
    }
}

module.exports = fileUpload