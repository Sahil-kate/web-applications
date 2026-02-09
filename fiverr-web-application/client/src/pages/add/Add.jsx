import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import "./Add.scss";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [feature, setFeature] = useState("");
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFileChange = (e, type) => {
    const selectedFiles = e.target.files;
    
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("No files selected!");
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const invalidFiles = Array.from(selectedFiles).filter(
      file => !validImageTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Only JPEG, PNG, JPG, or WEBP files are allowed!");
      return;
    }

    if (type === "single") {
      setSingleFile(selectedFiles[0]);
    } else {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleFeature = (e) => {
    e.preventDefault();
    if (feature.trim()) {
      dispatch({
        type: "ADD_FEATURE",
        payload: feature.trim()
      });
      setFeature("");
    }
  };

  const removeFeature = (feature) => {
    dispatch({
      type: "REMOVE_FEATURE",
      payload: feature
    });
  };

  const validateForm = () => {
    const requiredFields = [
      'title',
      'cat',
      'desc',
      'shortTitle',
      'shortDesc',
      'price',
      'deliveryTime',
      'revisionNumber'
    ];
    const missingFields = requiredFields.filter(field => !state[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    if (!singleFile) {
      toast.error("Please select a cover image!");
      return false;
    }

    // Validate numeric fields
    if (isNaN(state.price) || state.price <= 0) {
      toast.error("Please enter a valid price greater than 0");
      return false;
    }

    if (isNaN(state.deliveryTime) || state.deliveryTime <= 0) {
      toast.error("Please enter a valid delivery time in days");
      return false;
    }

    if (isNaN(state.revisionNumber) || state.revisionNumber < 0) {
      toast.error("Please enter a valid number of revisions");
      return false;
    }

    return true;
  };

  const mutation = useMutation({
    mutationFn: async (gigData) => {
      try {
        setUploading(true);
        // Upload cover image
        const cover = await upload(singleFile);
        if (!cover) {
          throw new Error("Failed to upload cover image");
        }

        // Upload additional images
        const images = await Promise.all(
          [...files].map(async (file) => {
            const url = await upload(file);
            return url;
          })
        );

        // Create gig with uploaded images
        const response = await newRequest.post("/gigs", {
          ...gigData,
          cover,
          images: images.filter(url => url)
        });

        return response.data;
      } catch (error) {
        console.error("Error in mutation:", error.response?.data || error.message);
        throw error;
      } finally {
        setUploading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      toast.success("Gig created successfully!");
      navigate("/mygigs");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create gig!";
      toast.error(errorMessage);
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        navigate("/login");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      toast.error("Please log in to create a gig");
      navigate("/login");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutateAsync(state);
    } catch (err) {
      console.error("Error creating gig:", err);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label>Category</label>
            <select name="cat" onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="ai">AI Services</option>
              <option value="music">Music & Audio</option>
              <option value="video">Video & Animation</option>
              <option value="marketing">Digital Marketing</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image</label>
                <input type="file" onChange={(e) => handleFileChange(e, "single")} />
                <label>Upload Images</label>
                <input type="file" multiple onChange={(e) => handleFileChange(e, "multiple")} />
              </div>
            </div>
            <label>Description</label>
            <textarea
              name="desc"
              placeholder="Brief description of your service"
              rows={16}
              onChange={handleChange}
            />
          </div>
          <div className="right">
            <label>Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label>Short Description</label>
            <textarea
              name="shortDesc"
              placeholder="Short description of your service"
              onChange={handleChange}
            />
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              min="1"
              placeholder="e.g. 100"
              onChange={handleChange}
            />
            <label>Delivery Time (days)</label>
            <input
              type="number"
              name="deliveryTime"
              min="1"
              placeholder="e.g. 3"
              onChange={handleChange}
            />
            <label>Number of Revisions</label>
            <input
              type="number"
              name="revisionNumber"
              min="0"
              placeholder="e.g. 2"
              onChange={handleChange}
            />
            <label>Add Features</label>
            <form onSubmit={handleFeature} className="add-feature-form">
              <input
                type="text"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                placeholder="e.g. page design"
              />
              <button type="submit">Add</button>
            </form>
            <div className="features">
              {state.features.map((f, index) => (
                <div key={index} className="feature-item">
                  <span>{f}</span>
                  <button onClick={() => removeFeature(f)} type="button">X</button>
                </div>
              ))}
            </div>
            <button onClick={handleSubmit} disabled={uploading} className="submit">
              {uploading ? "Creating Gig..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
