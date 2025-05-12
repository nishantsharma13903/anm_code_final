import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import Swal from 'sweetalert2';


const Stock = () => {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    images: [],
    name:"",
    image_slide: [], 
    price: "",
    quantity: "",
    origial_price:"",
    variants: [{ color: "#000000", sizes: ["S"] }],
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State for categories

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { color: "#000000", sizes: ["S"] }],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addSize = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index].sizes.push("");
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSizeChange = (variantIndex, sizeIndex, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes[sizeIndex] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const removeSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes.splice(sizeIndex, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("name", formData.name);

    

    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);   
    formDataToSend.append("origial_price", formData.origial_price); 
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("colorSizes", JSON.stringify(formData.variants));

    // Append images
    formData.images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // Append image_slide
    formData.image_slide.forEach((file) => {
      formDataToSend.append("image_slide", file);
    });

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/product/add-product",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added successfully!',
      });
    
      // Reset form after submission
      setFormData({
        description: "",
        name: "",
        category: "",
        images: [],
        image_slide: [],
        price: "",
        origial_price: "",
        quantity: "",
        variants: [{ color: "#000000", sizes: ["S"] }],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to add product. Please try again.',
      });
    }
     finally {
      setLoading(false);
    }
  };


  return (
    <div className="container-fluid mt-4 col-11 mx-auto">
      <div className="card p-4 shadow border">
        <h2 className="fw-bold text-center text-warning mb-4">Add Stock</h2>
        <form onSubmit={handleSubmit}>
  <div className="row">
    <div className="mb-3 col-md-6">
      <label className="form-label fw-bold text-warning">Product Name</label>
      <textarea
        name="name"
        className="form-control"
        rows="2"
        placeholder="Enter product name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="mb-3 col-md-6">
      <label className="form-label fw-bold text-warning">Product Description</label>
      <textarea
        name="description"
        className="form-control"
        rows="2"
        placeholder="Enter product description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="mb-3 col-md-6">
      <label className="form-label fw-bold text-warning">Product Category</label>
      <select
        name="category"
        className="form-select"
        value={formData.category}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Category</option>
        {categories
          .filter((cat) => cat.id === 4 || cat.id === 5)
          .map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </select>
    </div>
    <div className="mb-3 col-md-6">
      <label className="form-label fw-bold text-warning">Price (₹)</label>
      <input
        type="number"
        name="price"
        className="form-control"
        placeholder="Enter product price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="mb-3 col-md-6">
      <label className="form-label fw-bold text-warning">Original Price (₹)</label>
      <input
        type="number"
        name="origial_price"
        className="form-control"
        placeholder="Enter original price"
        value={formData.origial_price}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="mb-3 col-md-6">
      <label className="form-label fw-bold text-warning">Quantity</label>
      <input
        type="number"
        name="quantity"
        className="form-control"
        placeholder="Enter quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="mb-3 col-12">
      <label className="form-label fw-bold text-warning">Upload Images</label>
      <input
        type="file"
        name="files"
        className="form-control"
        multiple
        onChange={handleFileChange}
        required
      />
    </div>
  </div>

  {/* Variants */}
  <div className="mb-3">
    <label className="form-label fw-bold text-warning">Variants</label>
    {formData.variants.map((variant, index) => (
      <div key={index} className="border rounded p-3 mb-3">
        <div className="row align-items-center">
          <div className="col-md-3 mb-2">
            <label className="form-label fw-bold">Color:</label>
            <input
              type="color"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, "color", e.target.value)}
              className="form-control form-control-color"
            />
          </div>
          <div className="col-md-9">
            <label className="form-label fw-bold">Sizes:</label>
            {variant.sizes.map((size, sizeIndex) => (
              <div key={sizeIndex} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  value={size}
                  onChange={(e) => handleSizeChange(index, sizeIndex, e.target.value)}
                  className="form-control me-2"
                  placeholder="Enter size"
                  required
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeSize(index, sizeIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={() => addSize(index)}
            >
              Add Size
            </button>
          </div>
        </div>
        <div className="text-end mt-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => removeVariant(index)}
          >
            Remove Variant
          </button>
        </div>
      </div>
    ))}
    <button type="button" className="btn btn-warning mt-3 w-100" onClick={addVariant}>
      Add Variant
    </button>
  </div>

  <button type="submit" className="btn btn-warning w-100" disabled={loading}>
    {loading ? "Adding..." : "Add Stock"}
  </button>
</form>

      </div>
    </div>
  );
};

export default Stock;



