import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import { toast } from "react-toastify";

const Message = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);
  const [messageText, setMessageText] = useState("");

  // Get conversation details
  const { isLoading: isLoadingConversation, error: conversationError, data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: async () => {
      try {
        console.log("Fetching conversation:", id);
        const response = await newRequest.get(`/conversations/single/${id}`);
        console.log("Received conversation:", response.data);
        
        // Verify user is part of the conversation
        const isParticipant = 
          response.data.sellerId === currentUser._id || 
          response.data.buyerId === currentUser._id;
        
        if (!isParticipant) {
          toast.error("You are not authorized to view this conversation");
          navigate("/messages");
          return null;
        }
        
        return response.data;
      } catch (err) {
        console.error("Error fetching conversation:", err);
        const errorMessage = err.response?.data?.message || "Failed to load conversation";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    enabled: !!id && !!currentUser,
    retry: 1
  });

  // Get messages
  const { isLoading: isLoadingMessages, error: messagesError, data: messages } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      try {
        console.log("Fetching messages for conversation:", id);
        const response = await newRequest.get(`/messages/${id}`);
        console.log("Received messages:", response.data);
        return response.data;
      } catch (err) {
        console.error("Error fetching messages:", err);
        const errorMessage = err.response?.data?.message || "Failed to load messages";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    enabled: !!id && !!currentUser && !!conversation,
    refetchInterval: conversation ? 3000 : false // Only poll if conversation exists
  });

  // Send message mutation
  const mutation = useMutation({
    mutationFn: async (message) => {
      try {
        console.log("Sending message:", message);
        const response = await newRequest.post(`/messages`, message);
        console.log("Message sent successfully:", response.data);
        return response.data;
      } catch (err) {
        console.error("Error sending message:", err);
        const errorMessage = err.response?.data?.message || "Failed to send message";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
      setMessageText("");
      toast.success("Message sent successfully!");
    }
  });

  useEffect(() => {
    if (messages?.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      toast.warning("Please enter a message");
      return;
    }
    
    if (!conversation) {
      toast.error("Cannot send message - conversation not loaded");
      return;
    }
    
    mutation.mutate({
      conversationId: id,
      desc: messageText.trim(),
    });
  };

  const otherUser = conversation && (currentUser?.isSeller 
    ? conversation.buyerUsername 
    : conversation.sellerUsername);

  if (!currentUser) {
    return (
      <div className="message">
        <div className="container">
          <p>Please login to view messages</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {otherUser && `> ${otherUser}`}
        </span>
        {isLoadingMessages || isLoadingConversation ? (
          <div className="loading">
            <p>Loading messages...</p>
            <div className="loading-spinner"></div>
          </div>
        ) : messagesError || conversationError ? (
          <div className="error">
            <p>{messagesError?.message || conversationError?.message || "Error loading messages"}</p>
            <button onClick={() => {
              queryClient.invalidateQueries(["messages", id]);
              queryClient.invalidateQueries(["conversation", id]);
            }}>
              Try Again
            </button>
          </div>
        ) : !conversation ? (
          <div className="error">
            <p>Conversation not found or you don't have access</p>
            <button onClick={() => navigate("/messages")}>Back to Messages</button>
          </div>
        ) : (
          <div className="messages">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((m) => (
                <motion.div 
                  className={m.userId === currentUser._id ? "owner item" : "item"}
                  key={m._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={m.userId === currentUser._id ? currentUser.img || "/img/noavatar.jpg" : conversation?.buyerImg || "/img/noavatar.jpg"}
                    alt=""
                  />
                  <p>{m.desc}</p>
                </motion.div>
              ))
            ) : (
              <div className="no-messages">
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        <hr />
        {conversation && (
          <motion.form 
            className="write" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <textarea 
              type="text" 
              placeholder="Write a message..." 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              disabled={mutation.isLoading}
            />
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={mutation.isLoading || isLoadingMessages}
            >
              {mutation.isLoading ? "Sending..." : "Send"}
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default Message;
