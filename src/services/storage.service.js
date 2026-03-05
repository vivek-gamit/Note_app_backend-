const ImageKit = require("imagekit");
require("dotenv").config()

const imagekit = new ImageKit({
    publicKey: "public_hoRgSU+AK+mtsTnIiIW7oCN/Q7I=", 
    privateKey: process.env.IMAGEKIT_KEY,
    urlEndpoint: "https://ik.imagekit.io/your_id/"
});

async function uploadFile(buffer) {
    try {
       
        const result = await imagekit.upload({
            file: buffer, 
            fileName: "image.jpg",
        });

        return result;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
}

module.exports = uploadFile;