const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");

const authMW = require("../middleware/auth");

const { Thread, validateMessageThread, validateMessage } = require("../models/messageThread_model");

router.post("/thread", authMW, async (req, res) => {
    const { error, value } = validateMessageThread.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let participants = req.body.participants || [];

    participants.push(req.user._id);

    const existingThread = await Thread.findOne({
        relatedType: req.body.relatedType,
        relatedId: req.body.relatedId,
        participants: { $all: participants, $size: participants.length }
    });

    if (existingThread) {
        const filteredThread = _.pick(existingThread, ["_id", "relatedType", "relatedId", "participants", "messages", "createdAt", "updatedAt"]);
        res.json(filteredThread);
        return;
    } else {
        const messagesArray = [];

        if (value.initialMessage) {
            const { error } = validateMessage.validate({ content: value.initialMessage });

            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }

            messagesArray.push({
                sender: req.user._id,
                content: value.initialMessage
            });
        }

        const newThread = await new Thread({
            relatedType: value.relatedType,
            relatedId: value.relatedId,
            participants: participants,
            messages: messagesArray
        }).save();

        const filteredThread = _.pick(newThread, ["_id", "relatedType", "relatedId", "participants", "messages", "createdAt", "updatedAt"]);
        res.json(filteredThread);
    }
});

router.get("/thread/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const thread = await Thread.findById(req.params.id, { __v: 0 });

    if (!thread) {
        res.status(400).send("Thread not found.");
        return;
    }

    const isUser = thread.participants.some(p => p.toString() === req.user._id);
    const isAdmin = req.user.isAdmin;

    if (!isUser && !isAdmin) {
        res.status(400).send("Access denied. Only an admin or a participant of this thread can view it.");
        return;
    }

    res.json(thread);
});

router.post("/thread/:id/message", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    if (!req.body.content || req.body.content.trim() === "") {
        res.status(400).send("Message content is required.");
        return;
    }

    const { error } = validateMessage.validate({ content: req.body.content });

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const thread = await Thread.findById(req.params.id);

    if (!thread) {
        res.status(400).send("Thread not found.");
        return;
    }

    const isUser = thread.participants.some(p => p.toString() === req.user._id);
    const isAdmin = req.user.isAdmin;

    if (!isUser && !isAdmin) {
        res.status(400).send("Access denied. Only an admin or a participant of this thread can send messages.");
        return;
    }

    const lastMessage = thread.messages[thread.messages.length - 1];
    if (lastMessage && lastMessage.content === req.body.content && lastMessage.sender.toString() === req.user._id) {
        res.status(400).send("This is identical to the last message you sent. Please change it before sending again.");
        return;
    }

    const messagesArray = thread.messages;

    messagesArray.push({
        sender: req.user._id,
        content: req.body.content
    });

    await thread.save();

    const filteredThread = _.pick(thread, ["_id", "relatedType", "relatedId", "participants", "messages", "createdAt", "updatedAt"]);
    res.json(filteredThread);
});

router.put("/thread/:threadId/message/:messageId", authMW, async (req, res) => {
    const { threadId, messageId } = req.params;

    if (!mongoose.isValidObjectId(threadId) || !mongoose.isValidObjectId(messageId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const thread = await Thread.findById(threadId);

    if (!thread) {
        res.status(400).send("Thread not found.");
        return;
    }

    if (!req.body.content || req.body.content.trim() === "") {
        res.status(400).send("Message content is required.");
        return;
    }

    const { error } = validateMessage.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const message = thread.messages.find(msg => msg._id.toString() === messageId);

    if (!message) {
        res.status(400).send("Message not found.");
        return;
    }

    if (message.sender.toString() !== req.user._id) {
        res.status(400).send("Access denied. You can only edit messages you have created.");
        return;
    }

    message.content = req.body.content;

    await thread.save();

    const filteredThread = _.pick(thread, ["_id", "relatedType", "relatedId", "participants", "messages", "createdAt", "updatedAt"]);

    res.json(filteredThread);
});

router.delete("/thread/:threadId/message/:messageId", authMW, async (req, res) => {
    const { threadId, messageId } = req.params;

    if (!mongoose.isValidObjectId(threadId) || !mongoose.isValidObjectId(messageId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const thread = await Thread.findById(threadId);

    if (!thread) {
        res.status(400).send("Thread not found.");
        return;
    }

    const message = thread.messages.find(msg => msg._id.toString() === messageId);

    if (!message) {
        res.status(400).send("Message not found.");
        return;
    }

    if (message.sender.toString() !== req.user._id && !req.user.isAdmin) {
        res.status(400).send("Access denied. Only the sender or an admin can delete this message.");
        return;
    }

    const messageIndex = thread.messages.findIndex(msg => msg._id.toString() === messageId);

    thread.messages.splice(messageIndex, 1);

    await thread.save();

    const filteredThread = _.pick(thread, ["_id", "relatedType", "relatedId", "participants", "messages", "createdAt", "updatedAt"]);

    res.json(filteredThread);
});

router.get("/user/:userId", authMW, async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    if (req.user._id !== userId && !req.user.isAdmin) {
        res.status(400).send("Access denied. You can only view your own threads unless you are an admin.");
        return;
    }

    const threads = await Thread.find({ participants: userId })
        .select("_id relatedType relatedId participants messages createdAt updatedAt")
        .sort({ updatedAt: -1 });

    if (!threads || threads.length === 0) {
        return res.json([]);
    }

    res.json(threads);
});

router.delete("/thread/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    if (!req.user.isAdmin) {
        res.status(400).send("Access denied. Only admins can delete threads.");
        return;
    }

    const thread = await Thread.findById(req.params.id);

    if (!thread) {
        res.status(400).send("Thread not found.");
        return;
    }

    await Thread.findByIdAndDelete(req.params.id);

    const filteredThread = _.pick(thread, ["_id", "relatedType", "relatedId", "participants", "messages", "createdAt", "updatedAt"]);

    res.json(filteredThread);
});

module.exports = router;