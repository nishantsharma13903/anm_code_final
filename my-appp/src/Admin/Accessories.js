import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import swal from "sweetalert";


const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [newAccessory, setNewAccessory] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    color: "",
    quantity: "",
    images: null,
  });

  const [editData, setEditData] = useState({
    id: "",
    name: "",
    price: "",
    original_price: "",
    quantity: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/accessories";

  const fetchAccessories = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAccessories(response.data || []);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  const handleEditClick = (accessory) => {
    setSelectedAccessory(accessory);
    setEditData({
      id: accessory.id,
      name: accessory.name,
      price: accessory.price,
      original_price: accessory.original_price || "",
      quantity: accessory.quantity,
    });
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        Swal.fire("Deleted!", "Accessory has been deleted.", "success");
        setAccessories(accessories.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting accessory:", error);
        Swal.fire("Error", "Failed to delete the accessory.", "error");
      }
    }
  };

  const handleAddAccessory = async () => {
    const formData = new FormData();
    formData.append("name", newAccessory.name);
    formData.append("description", newAccessory.description);
    formData.append("category", newAccessory.category);
    formData.append("price", newAccessory.price);
    formData.append("color", newAccessory.color);
    formData.append("quantity", newAccessory.quantity);

    if (newAccessory.images) {
      for (let i = 0; i < newAccessory.images.length; i++) {
        formData.append("images", newAccessory.images[i]);
      }
    }

    try {
      await axios.post(API_BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Accessory added successfully.", "success");
      fetchAccessories();
    } catch (error) {
      console.error("Error adding accessory:", error);
      Swal.fire("Error", "Failed to add the accessory.", "error");
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, name, price, original_price, quantity } = editData;
      await axios.put(`${API_BASE_URL}/${id}`, {
        name,
        price,
        original_price,
        quantity,
      });
      Swal.fire("Success", "Accessory updated successfully.", "success");
      fetchAccessories();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating accessory:", error);
      Swal.fire("Error", "Failed to update the accessory.", "error");
    }
  };

  const filteredAccessories = accessories.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAccessories.length / pageSize);
  const paginatedAccessories = filteredAccessories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
        <h2 className="fw-bold mt-4">Accessories Dashboard</h2>
      </div>

      <div className="col-md-11 mx-auto mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row mt-4 col-12 mx-auto">
        <div className="col-md-11 mx-auto">
          <div className="bg-white shadow-sm rounded p-3">
            <h5 className="fw-bold mb-3">Accessory List</h5>
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Color</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAccessories.length > 0 ? (
                  paginatedAccessories.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {Array.isArray(item.images)
                          ? item.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={`${process.env.REACT_APP_IMG_BASE_URL}/uploads/${img}`}
                                alt="accessory"
                                style={{ width: "70px", height: "70px" }}
                                className="rounded me-1"
                              />
                            ))
                          : item.images && typeof item.images === "string"
                          ? item.images.split(",").map((img, idx) => (
                              <img
                                key={idx}
                                src={`/uploads/${img}`}
                                alt="accessory"
                                style={{ width: "70px", height: "70px" }}
                                className="rounded me-1"
                              />
                            ))
                          : "No Image"}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>₹{item.price}</td>
                      <td>
                        {Array.isArray(item.colors)
                          ? item.colors.map((color, i) => (
                              <span
                                key={i}
                                style={{
                                  backgroundColor: color,
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  marginRight: "5px",
                                  border: "1px solid #ccc",
                                }}
                                title={color}
                              ></span>
                            ))
                          : item.colors && (
                              <span
                                style={{
                                  backgroundColor: item.colors,
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  border: "1px solid #ccc",
                                }}
                                title={item.colors}
                              ></span>
                            )}
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditClick(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No accessories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => changePage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => changePage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => changePage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Edit Modal remains unchanged */}
      {/* ... */}
    </div>
  );
};

export default Accessories;
