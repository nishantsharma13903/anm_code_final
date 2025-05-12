import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const Banner = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image is required!",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
  
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/banner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message || "Banner uploaded successfully!",
      });
  
      // Clear the form
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to store banner.",
      });
    }
  };
  

  return (
    <div className="container-fluid mt-4 col-11 mx-auto">
      <h2>Add or Update Banner</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title (Optional):</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter banner title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description (Optional):</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter banner description"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          <small className="form-text text-danger mt-2">
            Note: Please upload an image with 1200px width and 800px height.
          </small>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Banner
        </button>
      </form>

      {/* {message && <div className="alert alert-info mt-3">{message}</div>} */}
    </div>
  );
};

export default Banner;
