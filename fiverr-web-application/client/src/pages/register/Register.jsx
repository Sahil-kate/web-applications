import React, { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";
import { validateField, validationRules } from "../../utils/validationService";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    canBeSeller: false,
    desc: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    // Validate field on change
    if (name === 'password' || name === 'username' || name === 'email') {
      const validation = validateField(value, validationRules.user[name]);
      setErrors(prev => ({
        ...prev,
        [name]: validation.errors[0] || ''
      }));
    }
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ 
      ...prev, 
      isSeller: e.target.checked,
      canBeSeller: e.target.checked 
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid image file!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all required fields before submission
    const validationErrors = {};
    ['username', 'email', 'password'].forEach(field => {
      const validation = validateField(user[field], validationRules.user[field]);
      if (!validation.isValid) {
        validationErrors[field] = validation.errors[0];
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    if (!user.username || !user.email || !user.password || !user.country || !user.phone || !user.desc) {
      toast.error("❌ Please fill out all required fields.");
      return;
    }

    const loadingToastId = toast.loading("🔍 Verifying details...");
    
    try {
      setLoading(true);

      let imageUrl = "";
      if (file) {
        toast.update(loadingToastId, {
          render: "📤 Uploading image...",
          type: "info",
          isLoading: true,
        });
        
        imageUrl = await upload(file);
        if (!imageUrl) {
          toast.update(loadingToastId, {
            render: "❌ Failed to upload image. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          setLoading(false);
          return;
        }
      }

      const updatedUser = { ...user, img: imageUrl };

      await newRequest.post("/auth/register", updatedUser);

      toast.update(loadingToastId, {
        render: "🎉 Account created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });


      const loginRes = await newRequest.post("/auth/login", {
        username: user.username,
        password: user.password,
      });

      if (loginRes.data && loginRes.data.token && loginRes.data.user) {
        // Store the user data and token
        localStorage.setItem("currentUser", JSON.stringify(loginRes.data.user));
        localStorage.setItem("token", loginRes.data.token);

        // Redirect to the dashboard after 1 second
        setTimeout(() => navigate("/", { replace: true }), 1000);
      } else {
        toast.error("Auto-login failed after registration. Please log in manually.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "❌ An error occurred. Please try again.";
      toast.update(loadingToastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <div className="input-group">
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              onChange={handleChange}
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <label htmlFor="">Email</label>
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <label htmlFor="">Password</label>
          <div className="input-group">
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <label htmlFor="">Profile Picture</label>
          <div className="input-group">
            <input type="file" onChange={handleFileChange} />
            {errors.img && <span className="error">{errors.img}</span>}
          </div>
          <label htmlFor="">Country</label>
          <div className="input-group">
            <input
              name="country"
              type="text"
              placeholder="USA"
              onChange={handleChange}
              required
            />
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        <div className="right">
          <h1>Become a Seller</h1>
          <div className="toggle">
            <label>Enable Seller Account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label>Phone Number</label>
          <input 
            name="phone" 
            type="text" 
            placeholder="+1 234 567 89" 
            onChange={handleChange} 
            required 
          />
          <label>Description</label>
          <textarea 
            placeholder="Tell us about yourself..." 
            name="desc" 
            cols="30" 
            rows="10" 
            onChange={handleChange} 
            required
          ></textarea>
        </div>
      </form>
    </motion.div>
  );
}

export default Register;
