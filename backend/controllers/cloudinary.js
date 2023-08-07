require("dotenv").config();

const cloudinary = require("cloudinary").v2; // Cloudinary SDK

exports.deleteAsset = async (req, res) => {
  const publicId = req.body.productId;

  // Check if publicId is provided
  if (!publicId) {
    return res.status(400).json({ msg: "No public_id provided" });
  }

  try {
    // Attempt to delete image from Cloudinary using the provided publicId
    const result = await cloudinary.uploader.destroy(publicId);

    // If deletion was successful, send success response
    if (result.result === "ok") {
      return res.json({ msg: "Image deleted successfully" });
    } else {
      return res.status(400).json({ msg: "Failed to delete image" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};
