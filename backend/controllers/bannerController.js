const db = require("../config/db");
const multer = require('multer');
const path = require('path');

// Setting up multer for file storage (banner image)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Saving the image with timestamp as the filename
  }
});

const upload = multer({ storage: storage });

const storeBanner = (req, res) => {
  const { title = "", description = "" } = req.body;
  // Store only the file name, not the full URL
  const image = req.file ? req.file.filename : "";  // Just store the file name
  
  if (!image) {
    return res.status(400).json({ message: "image are required." });
  }

  // First, check if a banner already exists in the database
  const checkQuery = `SELECT * FROM banners LIMIT 1`; // Assuming only one banner exists
  db.query(checkQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to check banner." });
    }

    if (result.length > 0) {
      // If banner exists, update the banner
      const updateQuery = `UPDATE banners SET image = ?, title = ?, description = ? WHERE id = ?`;
      db.query(updateQuery, [image, title, description, result[0].id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to update banner." });
        }

        res.status(200).json({
          message: "Banner updated successfully!",
          banner: { image, title, description }
        });
      });
    } else {
      // If banner doesn't exist, insert a new banner
      const insertQuery = `INSERT INTO banners (image, title, description) VALUES (?, ?, ?)`;
      db.query(insertQuery, [image, title, description], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to store banner." });
        }

        res.status(200).json({
          message: "Banner stored successfully!",
          banner: { image, title, description }
        });
      });
    }
  });
};


  
const getBanner = (req, res) => {
  const query = `SELECT * FROM banners LIMIT 1`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to retrieve banner." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Banner data not found." });
    }

    const banner = result[0];

    // Check if banner.image already contains "http" or "/uploads/"
    const imageUrl = banner.image.startsWith("http")
      ? banner.image
      : `${process.env.REACT_APP_IMG_BASE_URL}/uploads/${banner.image}`;;

    res.status(200).json({
      image: imageUrl,
      title: banner.title,
      description: banner.description
    });
  });
};



const updateBanner = (req, res) => {
  const { title, description = "" } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }
  const image = req.file ? req.file.filename : null;

  const getQuery = `SELECT * FROM banners LIMIT 1`;
  db.query(getQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to get banner data for update." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Banner not found." });
    }

    const currentBanner = result[0];
    let updatedImage = image || currentBanner.image;

    // ✅ Clean up the image path if it has repeated 'uploads/'
    updatedImage = updatedImage.replace(/^uploads\/uploads\//, '').replace(/^uploads\//, '');

    const updateQuery = `UPDATE banners SET image = ?, title = ?, description = ? WHERE id = ?`;
    db.query(updateQuery, [updatedImage, title, description, currentBanner.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update banner." });
      }

      res.status(200).json({
        message: "Banner updated successfully!",
        banner: { image: updatedImage, title, description }
      });
    });
  });
};


module.exports = {
  upload,
  storeBanner,
  getBanner,
  updateBanner
};
