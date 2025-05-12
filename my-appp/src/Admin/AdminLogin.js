import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/Logo.jpeg";
import swal from "sweetalert";


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("admin-auth", "true");
        navigate("/dashboard");
      }
       else {
        swal.alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      swal.alert("Something went wrong");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="mb-2" />
      </div>
      <h2 className="text-center">Admin Login</h2>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn w-100"
          style={{ backgroundColor: '#BE6E02', color: 'white' }}
          onClick={handleLogin}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
