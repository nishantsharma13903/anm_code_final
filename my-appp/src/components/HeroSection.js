import React, { useEffect, useState } from "react";
import "./Style/Banner.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load environment variables
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const IMG_BASE_URL = process.env.REACT_APP_IMG_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/banner`)
      .then((response) => response.json())
      .then((data) => {
        if (data.image) {
          // Fix potential duplicated path segment
          const correctedImage = data.image.replace(/\/uploads\/uploads\//, "/uploads/");
          const imagePath = correctedImage.startsWith("http")
            ? correctedImage
            : `${IMG_BASE_URL}/${correctedImage.replace(/^uploads\//, "")}`;

          setBanner({
            ...data,
            image: imagePath,
          });
        } else {
          setError("Incomplete data received");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching banner:", error);
        setError("Error fetching banner");
        setLoading(false);
      });
  }, [API_BASE_URL, IMG_BASE_URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-fluid pb-4">
      <section
        className="banner-section img-fluid"
        style={{
          backgroundImage: banner.image ? `url(${banner.image})` : "none",
        }}
      >
        <div className="container">
          <h1 className="fw-bold pb-4">{banner.title}</h1>
          {banner.description && (
            <p className="lead my-4">{banner.description}</p>
          )}
          <button
            className="btn btn-lg mt-4 p-4"
            onClick={() => navigate("/process")}
            aria-label="Start designing custom merchandise"
          >
            Start Designing →
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
