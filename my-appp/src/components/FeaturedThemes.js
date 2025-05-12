import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Style/feature.css";

const FeaturedThemes = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/categories");
        const data = await response.json();
        if (data && data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    let apiUrl = "";

    if ([4, 5].includes(categoryId)) {
      apiUrl = `${process.env.REACT_APP_API_BASE_URL}/products/category/${categoryId}`;
    } else if ([2, 6, 8].includes(categoryId)) {
      apiUrl = `${process.env.REACT_APP_API_BASE_URL}/accessories/cat/${categoryId}`;
    }

    if (apiUrl) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(`API response for category ${categoryId}:`, data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="container text-center pt-5">
      <h2 className="fw-bold pb-5 featured">Featured Categories</h2>
      <div className="row justify-content-between g-5 mx-0">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="col-auto"
              onClick={() => handleCategoryClick(category.id)}
              style={{ cursor: "pointer" }} // Added cursor pointer for better UX
            >
              <div className="theme-circle border-gradient-blue">
              <img
  src={`${process.env.REACT_APP_IMG_BASE_URL}/uploads/${category.image}`}
  alt={category.name}
  className="img-fluid"
  style={{ width: "150px", height: "150px", objectFit: "cover" }}
/>

              </div>
              <p className="mt-2 fw-semibold theme-name">{category.name}</p>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedThemes;
