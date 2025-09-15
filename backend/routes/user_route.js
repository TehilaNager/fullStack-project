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

router.put("/:id", authMW, async (req, res) => { });

module.exports = router;