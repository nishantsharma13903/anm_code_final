import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/HeadlineSlider.css';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/headlines`;

const HeadlineSlider = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await axios.get(API_BASE);
        const visible = res.data.filter(h => h.status === 1);

        // Duplicate the array for smooth scrolling
        const repeatCount = 20;
        const repeatedHeadlines = Array(repeatCount).fill(visible).flat();

        setHeadlines(repeatedHeadlines);
      } catch (err) {
        console.error('Error fetching headlines:', err);
      }
    };
    fetchHeadlines();
  }, []);

  if (headlines.length === 0) return null;

  return (
    <div className="headline-bar container-fluid py-2 bg-dark text-white overflow-hidden">
      <div className="headline-wrapper row">
        <div className="headline-track d-flex align-items-center">
          {headlines.map((h, i) => (
            <span key={i} className="headline-text me-4">
              📰 {h.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadlineSlider;
