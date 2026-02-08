const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");

const { User } = require("../models/user_model");
const { Request } = require("../models/supportRequest_model");
const { Offer } = require("../models/supportOffer_model");

const authMW = require("../middleware/auth");

router.patch("/request/:id", authMW, async (req, res) => {
    try {
        const requestId = req.params.id;

        if (!mongoose.isValidObjectId(requestId)) {
            res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
            return;
        }

        const request = await Request.findById(requestId);
        if (!request) {
            res.status(404).send("Request not found.");
            return;
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404).send("User not found.");
            return;
        }

        const existing = user.favoriteRequests.find(fav => fav.request.toString() === requestId);

        if (existing) {
            user.favoriteRequests = user.favoriteRequests.filter(fav => fav.request.toString() !== requestId);
        } else {
            user.favoriteRequests.push({ request: requestId, addedAt: new Date() });
        }

        await user.save();

        const filteredUser = _.pick(user, ["_id", "fullName", "email", "role", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"]);
        res.json(filteredUser);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error while toggling favorite request.");
    }
});

router.patch("/offer/:id", authMW, async (req, res) => {
    try {
        const offerId = req.params.id;

        if (!mongoose.isValidObjectId(offerId)) {
            res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
            return;
        }

        const offer = await Offer.findById(offerId);
        if (!offer) {
            res.status(404).send("Offer not found.");
            return;
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404).send("User not found.");
            return;
        }

        const existing = user.favoriteOffers.find(fav => fav.offer.toString() === offerId);

        if (existing) {
            user.favoriteOffers = user.favoriteOffers.filter(fav => fav.offer.toString() !== offerId);
        } else {
            user.favoriteOffers.push({ offer: offerId, addedAt: new Date() });
        }

        await user.save();

        const filteredUser = _.pick(user, ["_id", "fullName", "email", "role", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"]);
        res.json(filteredUser);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error while toggling favorite offer.");
    }
});

router.get("/", authMW, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("favoriteOffers.offer")
            .populate("favoriteRequests.request");


        if (!user) {
            res.status(404).send("User not found.");
            return;
        }

        const favoriteOffers = user.favoriteOffers.filter(fav => fav.offer !== null);
        const favoriteRequests = user.favoriteRequests.filter(fav => fav.request !== null);


        const filteredUser = _.pick(user, ["_id", "fullName"]);
        filteredUser.favoriteOffers = favoriteOffers;
        filteredUser.favoriteRequests = favoriteRequests;

        res.json(filteredUser);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error while fetching user favorites.");
    }
});


module.exports = router;