import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyGigs.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";
import { FiTrash2, FiExternalLink } from "react-icons/fi";

function MyGigs() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // Redirect if not a seller
  useEffect(() => {
    if (!currentUser || !currentUser.isSeller) {
      toast.error("Only sellers can access this page");
      navigate("/");
      return;
    }
  }, [currentUser, navigate]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs", currentUser?._id],
    queryFn: async () => {
      try {
        // Fetch gigs with userId filter
        const response = await newRequest.get(`/gigs?userId=${currentUser._id}`);
        // Filter gigs to only show those created by the current user
        const filteredGigs = response.data.filter(gig => gig.userId === currentUser._id);
        return filteredGigs;
      } catch (err) {
        console.error("Error fetching gigs:", err);
        throw new Error(err.response?.data?.message || "Failed to fetch your gigs");
      }
    },
    enabled: !!currentUser?._id && currentUser.isSeller,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (gigId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }
        
        console.log("Attempting to delete gig:", gigId);
        const response = await newRequest.delete(`/gigs/${gigId}`);
        console.log("Delete response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Delete error details:", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          error
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Delete successful:", data);
      queryClient.invalidateQueries(["myGigs", currentUser?._id]);
      toast.success("Gig deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete gig";
      toast.error(errorMessage);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        navigate("/login");
      }
    },
  });

  const handleDelete = (id) => {
    if (!id) {
      console.error("No gig ID provided for deletion");
      toast.error("Invalid gig ID");
      return;
    }

    toast.info(
      <div>
        <p>Are you sure you want to delete this gig?</p>
        <p style={{ fontSize: '0.8em', marginTop: '8px' }}>This action cannot be undone.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', gap: '8px' }}>
          <button
            onClick={() => toast.dismiss()}
            style={{
              padding: '6px 12px',
              background: '#e4e6eb',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss();
              deleteMutation.mutate(id);
            }}
            style={{
              padding: '6px 12px',
              background: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const handleGigClick = (gigId) => {
    navigate(`/gig/${gigId}`);
  };

  const handleImageError = (gig) => {
    console.warn(`Failed to load image for gig: ${gig.title}`);
  };

  if (!currentUser?.isSeller) {
    return null; // Return null while redirecting
  }

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>My Gigs</h1>
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>

        {isLoading ? (
          <div className="loading">Loading your gigs...</div>
        ) : error ? (
          <div className="error">
            {error.message || "Error loading gigs. Please try again later."}
          </div>
        ) : !data?.length ? (
          <div className="no-gigs">
            <p>You haven't created any gigs yet. Create your first gig!</p>
            <Link to="/add">
              <button className="create-gig-btn">Create a Gig</button>
            </Link>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <div className="image-container" onClick={() => handleGigClick(gig._id)}>
                      <img 
                        className="image" 
                        src={gig.cover || "/img/noimage.jpg"} 
                        alt={gig.title}
                        onError={(e) => {
                          handleImageError(gig);
                          e.target.src = "/img/noimage.jpg";
                          e.target.alt = "Cover image not available";
                        }}
                      />
                      <div className="image-overlay">
                        <FiExternalLink />
                        <span>View Gig</span>
                      </div>
                    </div>
                  </td>
                  <td>{gig.title}</td>
                  <td>${gig.price}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(gig._id)}
                      disabled={deleteMutation.isPending}
                    >
                      <FiTrash2 /> {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyGigs;
