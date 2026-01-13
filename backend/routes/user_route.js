const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");

const authMW = require("../middleware/auth");

const { User, validateUpdate } = require("../models/user_model");

router.get("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const isUser = req.params.id === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isUser && !isAdmin) {
        res.status(403).send("Access denied. You can only view your own profile or an admin can view others' profiles.")
        return;
    }

    const user = await User.findById(req.params.id, { password: 0, __v: 0 });

    if (!user) {
        res.status(404).send("User not found.");
        return;
    }

    res.json(user);
});

router.put("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const { error, value } = validateUpdate.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const isUser = req.params.id === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isUser && !isAdmin) {
        res.status(403).send("Access denied. You can only update your own profile or an admin can update others' profiles.");
        return;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!updatedUser) {
        res.status(404).send("User not found");
        return;
    }

    const filteredUser = _.pick(updatedUser, ["_id", "fullName", "email", "role", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"]);

    res.json(filteredUser);
});

router.delete("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const isAdmin = req.user.role === "admin";

    if (!isAdmin) {
        res.status(403).send("Access denied. Only an admin can delete user accounts.");
        return;
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        res.status(404).send("User not found");
        return;
    }

    const filteredUser = _.pick(deletedUser, ["_id", "fullName", "email", "role", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"]);

    res.json(filteredUser);
});

router.get("/", authMW, async (req, res) => {
    const isAdmin = req.user.role === "admin";

    if (!isAdmin) {
        res.status(403).send("Access denied. Only an admin can view the list of all users.");
        return;
    }

    const allUsers = await User.find({}, { password: 0, __v: 0 });

    res.json(allUsers);
});

router.put("/:id/admin", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const isAdmin = req.user.role === "admin";

    if (!isAdmin) {
        res.status(403).send("Access denied. Only an admin can change user roles.");
        return;
    }

    const updatedUser = await User.findById(req.params.id);

    if (!updatedUser) {
        res.status(404).send("User not found.");
        return;
    }

    if (updatedUser.role === "admin") {
        return res
            .status(400)
            .send("Cannot change role of another admin.");
    }

    updatedUser.role = updatedUser.role === "userAdmin" ? "user" : "userAdmin";

    await updatedUser.save();

    const filteredUser = _.pick(updatedUser, ["_id", "fullName", "email", "role", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"])

    res.json(filteredUser);
});

module.exports = router;