import axios from "axios";

const upload = async (file) => {
  try {
    // Debug logging
    console.log("Environment variables check:", {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
      allEnv: import.meta.env
    });

    // Validate environment variables
    if (!import.meta.env.VITE_CLOUD_NAME || !import.meta.env.VITE_UPLOAD_PRESET) {
      throw new Error("Missing Cloudinary credentials");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      formData
    );

    if (!response.data.url) {
      throw new Error("Failed to get upload URL");
    }

    return response.data.url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export default upload;
