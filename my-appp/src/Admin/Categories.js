import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { Modal } from "bootstrap";
import swal from 'sweetalert';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const IMG_URL = process.env.REACT_APP_IMG_BASE_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [modalData, setModalData] = useState({
    name: "",
    description: "",
    image: null,
    imagePreview: "",
    id: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const resetModal = () => {
    setModalData({ name: "", description: "", image: null, imagePreview: "", id: null });
  };

  const handleShowModal = (category = null) => {
    if (category) {
      setModalData({
        name: category.name,
        description: category.description,
        image: null,
        imagePreview: category.image ? `${IMG_URL}/uploads/${category.image}` : "",
        id: category.id,
      });
    } else {
      resetModal();
    }
    const modalElement = document.getElementById("categoryModal");
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // 1. Define the allowed MIME types
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      // 2. Show an alert and clear the input
      window.alert("Only JPG or PNG images are allowed.");
      e.target.value = null;              // reset the file input
      setModalData((prev) => ({
        ...prev,
        image: null,
        imagePreview: "",
      }));
      return;
    }
  
    // 3. If valid, set the file and preview as before
    setModalData((prevData) => ({
      ...prevData,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", modalData.name);
      formData.append("description", modalData.description);
      if (modalData.image) {
        formData.append("image", modalData.image);
      }
  
      if (modalData.id) {
        await axios.put(`${API_URL}/categories/update/${modalData.id}`, formData);
        swal("Success", "Category updated successfully", "success");
      } else {
        await axios.post(`${API_URL}/api/categories/add`, formData);
        swal("Success", "Category added successfully", "success");
      }
  
      fetchCategories();
      document.getElementById("closeModal").click();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        error.message ||
        "An unknown error occurred.";
  
      if (typeof message === "object") {
        const combined = Object.values(message).flat().join("\n");
        swal("Error", combined, "error");
      } else {
        swal("Error", message, "error");
      }
    }
  };
  

  const handleDelete = async (id) => {
    const confirm = await swal({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
  
    if (confirm) {
      try {
        await axios.delete(`${API_URL}/categories/delete/${id}`);
        swal("Deleted!", "Category has been deleted.", "success");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        swal("Error", "Failed to delete category", "error");
      }
    }
  };
  
  return (
    <div className="container-fluid mt-4">
      <div className="col-11 mx-auto card p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">Categories</h2>
          {/* <button className="btn btn-primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-1" /> Add Category
          </button> */}
        </div>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  {category.image && (
                    <img src={`${IMG_URL}/uploads/${category.image}`} alt="Category" width="50" />
                  )}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleShowModal(category)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing Category */}
      <div className="modal fade" id="categoryModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalData.id ? "Edit Category" : "Add Category"}</h5>
              <button type="button" id="closeModal" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-3"
                  placeholder="Category Name"
                  value={modalData.name}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  className="form-control mb-3"
                  placeholder="Description"
                  value={modalData.description}
                  onChange={handleChange}
                  required
                />
                <input type="file" className="form-control mb-3" onChange={handleImageChange} accept="image/*" />
                {modalData.imagePreview && <img src={modalData.imagePreview} alt="Preview" width="100" className="mb-3" />}
                <button type="submit" className="btn btn-warning">
                  {modalData.id ? "Update" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
