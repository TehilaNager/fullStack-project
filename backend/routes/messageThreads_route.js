const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");

const authMW = require("../middleware/auth");

const { Thread, validateMessageThread, validateMessage } = require("../models/messageThread_model");

function filterThread(thread) {
    return _.pick(thread, ["_id", "relatedType", "relatedId", "participants", "messages", "createdAt", "updatedAt"]);
}

router.post("/thread", authMW, async (req, res) => {
    const { error, value } = validateMessageThread.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let participants = [...(value.participants || [])];

    if (!participants.includes(req.user._id.toString())) {
        participants.push(req.user._id);
    }

    const existingThread = await Thread.findOne({
        relatedType: value.relatedType,
        relatedId: value.relatedId,
        participants: { $all: participants, $size: participants.length }
    });

    if (existingThread) {
        res.json(filterThread(existingThread));
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

        res.json(filterThread(newThread));
    }
});

router.get("/thread/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const thread = await Thread.findById(req.params.id, { __v: 0 });

    if (!thread) {
        res.status(404).send("Thread not found.");
        return;
    }

    const isUser = thread.participants.some(p => p.toString() === req.user._id);
    const isUserAdmin = req.user.role === "userAdmin";

    if (!isUser && !isUserAdmin) {
        res.status(403).send("Access denied. Only the user who participates in this thread or a userAdmin can view it.");
        return;
    }

    res.json(filterThread(thread));

});

router.post("/thread/:id/message", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const { error, value } = validateMessage.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const thread = await Thread.findById(req.params.id);
    if (!thread) {
        res.status(404).send("Thread not found.");
        return;
    }

    const isUser = thread.participants.some(p => p.toString() === req.user._id);
    const isUserAdmin = req.user.role === "userAdmin";
    if (!isUser && !isUserAdmin) {
        res.status(403).send("Access denied. Only the user who participates in this thread or a userAdmin can send messages.");
        return;
    }

    const lastMessage = thread.messages[thread.messages.length - 1];
    if (lastMessage && lastMessage.content === value.content && lastMessage.sender.toString() === req.user._id) {
        res.status(400).send("This is identical to the last message you sent. Please change it before sending again.");
        return;
    }

    thread.messages.push({
        sender: req.user._id,
        content: value.content
    });

    await thread.save();

    res.json(filterThread(thread));
});

router.put("/thread/:threadId/message/:messageId", authMW, async (req, res) => {
    const { threadId, messageId } = req.params;

    if (!mongoose.isValidObjectId(threadId) || !mongoose.isValidObjectId(messageId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const thread = await Thread.findById(threadId);
    if (!thread) {
        res.status(404).send("Thread not found.");
        return;
    }

    const { error, value } = validateMessage.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const message = thread.messages.find(msg => msg._id.toString() === messageId);

    if (!message) {
        res.status(404).send("Message not found.");
        return;
    }

    if (message.sender.toString() !== req.user._id) {
        res.status(403).send("Access denied. You can only edit messages you have created.");
        return;
    }

    message.content = value.content;

    await thread.save();

    res.json(filterThread(thread));
});

router.delete("/thread/:threadId/message/:messageId", authMW, async (req, res) => {
    const { threadId, messageId } = req.params;

    if (!mongoose.isValidObjectId(threadId) || !mongoose.isValidObjectId(messageId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const thread = await Thread.findById(threadId);

    if (!thread) {
        res.status(404).send("Thread not found.");
        return;
    }

    const message = thread.messages.find(msg => msg._id.toString() === messageId);

    if (!message) {
        res.status(404).send("Message not found.");
        return;
    }

    if (message.sender.toString() !== req.user._id && req.user.role !== "userAdmin") {
        res.status(403).send("Access denied. Only the sender of the message or a userAdmin can delete it.");
        return;
    }


    const messageIndex = thread.messages.findIndex(msg => msg._id.toString() === messageId);

    thread.messages.splice(messageIndex, 1);

    await thread.save();

    res.json(filterThread(thread));
});

router.get("/user/:userId", authMW, async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    if (req.user._id.toString() !== userId && req.user.role !== "userAdmin") {
        res.status(403).send("Access denied. You can only view your own threads unless you are a userAdmin.");
        return;
    }

    const threads = await Thread.find({ participants: userId })
        .select("_id relatedType relatedId participants messages createdAt updatedAt")
        .sort({ updatedAt: -1 });

    if (!threads || threads.length === 0) {
        return res.json([]);
    }
    res.json(threads.map((thread) => filterThread(thread)));
});

router.delete("/thread/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    if (req.user.role !== "userAdmin") {
        res.status(403).send("Access denied. Only a userAdmin can delete threads.");
        return;
    }

    const thread = await Thread.findById(req.params.id);

    if (!thread) {
        res.status(404).send("Thread not found.");
        return;
    }

    await thread.deleteOne();

    res.json(filterThread(thread));
});

module.exports = router;