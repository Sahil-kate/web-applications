import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
  try {
    if (!req.body.conversationId) {
      return next(createError(400, "Conversation ID is required"));
    }
    if (!req.body.desc) {
      return next(createError(400, "Message content is required"));
    }

    // Check if conversation exists
    const conversation = await Conversation.findOne({ id: req.body.conversationId });
    if (!conversation) {
      return next(createError(404, "Conversation not found"));
    }

    // Verify user is part of the conversation
    if (conversation.sellerId !== req.userId && conversation.buyerId !== req.userId) {
      return next(createError(403, "You are not authorized to send messages in this conversation"));
    }

    const newMessage = new Message({
      conversationId: req.body.conversationId,
      userId: req.userId,
      desc: req.body.desc,
    });

    const savedMessage = await newMessage.save();
    
    // Update conversation
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    console.error("Error creating message:", err);
    next(createError(500, "Error creating message"));
  }
};

export const getMessages = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(createError(400, "Conversation ID is required"));
    }

    // Check if conversation exists
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) {
      return next(createError(404, "Conversation not found"));
    }

    // Verify user is part of the conversation
    if (conversation.sellerId !== req.userId && conversation.buyerId !== req.userId) {
      return next(createError(403, "You are not authorized to view these messages"));
    }

    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    next(createError(500, "Error fetching messages"));
  }
};
