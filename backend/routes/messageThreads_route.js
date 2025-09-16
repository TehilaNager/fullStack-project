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

router.put("/thread/:threadId/message/:messageId", (req, res) => { });

router.delete("/thread/:threadId/message/:messageId", (req, res) => { });

router.get("/user/:userId", (req, res) => { });

router.delete("/thread/:id", (req, res) => { })

module.exports = router;