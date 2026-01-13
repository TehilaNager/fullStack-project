const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");

const { User } = require("../models/user_model");
const { Request } = require("../models/supportRequest_model");
const { Offer } = require("../models/supportOffer_model");

const authMW = require("../middleware/auth");

router.patch("/request/:id", authMW, async (req, res) => {
    const requestId = req.params.id;

    if (!mongoose.isValidObjectId(requestId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const request = await Request.findById(requestId);

    if (!request) {
        res.status(404).send("Request not found. Please provide a valid request ID.");
        return;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404).send("User not found.");
        return;
    }

    if (user.favoriteRequests.includes(requestId)) {
        const index = user.favoriteRequests.indexOf(requestId);
        user.favoriteRequests.splice(index, 1);
    } else {
        user.favoriteRequests.push(requestId);
    }

    await user.save();

    const filteredUser = _.pick(user, ["_id", "fullName", "email", "role", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"])

    res.json(filteredUser);
});

router.patch("/offer/:id", authMW, async (req, res) => {
    const offerId = req.params.id;

    if (!mongoose.isValidObjectId(offerId)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const offer = await Offer.findById(offerId);

    if (!offer) {
        res.status(404).send("Offer not found. Please provide a valid offer ID.");
        return;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404).send("User not found.");
        return;
    }

    if (user.favoriteOffers.includes(offerId)) {
        const index = user.favoriteOffers.indexOf(offerId);
        user.favoriteOffers.splice(index, 1);
    } else {
        user.favoriteOffers.push(offerId);
    }

    await user.save();

    const filteredUser = _.pick(user, ["_id", "fullName", "email", "role", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"])

    res.json(filteredUser);
});

router.get("/", authMW, authMW, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404).send("User not found.");
        return;
    }

    const filteredUser = _.pick(user, ["_id", "fullName", "favoriteRequests", "favoriteOffers"]);

    res.json(filteredUser);
});

module.exports = router;