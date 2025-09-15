const express = require("express");
const router = express.Router();
const _ = require("lodash");

const authMW = require("../middleware/auth");

const { User, validateUpdate } = require("../models/user_model");

router.get("/:id", authMW, async (req, res) => {
    const isUser = req.params.id === req.user._id;
    const isAdmin = req.user.isAdmin;

    if (!isUser && !isAdmin) {
        res.status(400).send("Access denied. You can only view your own profile or you must be an admin to view others' profiles.")
        return;
    }

    const user = await User.findById(req.params.id, { password: 0, __v: 0 });

    if (!user) {
        res.status(400).send("User not found.");
        return;
    }

    res.json(user);
});

router.put("/:id", authMW, async (req, res) => {
    const { error, value } = validateUpdate.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const isUser = req.params.id === req.user._id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin && !isUser) {
        res.status(400).send("Access denied. You can only update your own profile or you must be an admin to update others' profiles.");
        return;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!updatedUser) {
        res.status(400).send("User not found");
        return;
    }

    const filteredUser = _.pick(updatedUser, ["_id", "fullName", "email", "isAdmin", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"]);

    res.json(filteredUser);
});

router.delete("/:id", authMW, async (req, res) => {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
        res.status(400).send("Access denied. Only an admin can delete user accounts.");
        return;
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        res.status(400).send("User not found");
        return;
    }

    const filteredUser = _.pick(deletedUser, ["_id", "fullName", "email", "isAdmin", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"]);

    res.json(filteredUser);
});

router.get("/", authMW, async (req, res) => {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
        res.status(400).send("Access denied. Only an admin can view the list of all users.");
        return;
    }

    const allUsers = await User.find({}, { password: 0, __v: 0 });

    res.json(allUsers);
});

module.exports = router;