const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");

const authMW = require("../middleware/auth");

const { Offer, validateOffer, validateOfferUpdate } = require("../models/supportOffer_model");

router.post("/", authMW, async (req, res) => {
    const { error, value } = validateOffer.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const newOffer = await new Offer({
        ...value,
        supporter: req.user._id
    }).save();

    const filteredRequest = _.pick(newOffer, ["_id", "supporter", "title", "description", "category", "region", "city", "status", "createdAt", "updatedAt"]);

    res.json(filteredRequest);
});

router.get("/", async (req, res) => {
    const offers = await Offer.find({}, { __v: 0 });
    res.json(offers);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const offer = await Offer.findById(req.params.id, { __v: 0 });

    if (!offer) {
        res.status(400).send("Offer not found.");
        return;
    }

    res.json(offer);
});

router.put("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const { error, value } = validateOfferUpdate.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const offer = await Offer.findById(req.params.id);

    if (!offer) {
        res.status(400).send("Offer not found.");
        return;
    }

    const isUser = offer.supporter.toString() === req.user._id;
    const isAdmin = req.user.isAdmin;

    if (!isUser && !isAdmin) {
        res.status(400).send("Access denied. Only an admin or the user who created the offer can update it.");
        return;
    }

    Object.assign(offer, value);
    await offer.save();

    const filteredOffer = _.pick(offer, ["_id", "supporter", "title", "description", "category", "region", "city", "status", "createdAt", "updatedAt"]);

    res.json(filteredOffer);
});

router.delete("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const offer = await Offer.findById(req.params.id);

    if (!offer) {
        res.status(400).send("Offer not found.");
        return;
    }

    const isUser = offer.supporter.toString() === req.user._id;
    const isAdmin = req.user.isAdmin;

    if (!isUser && !isAdmin) {
        res.status(400).send("Access denied. Only an admin or the user who created this offer can delete it.");
        return;
    }

    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);

    const filteredOffer = _.pick(deletedOffer, ["_id", "supporter", "title", "description", "category", "region", "city", "status", "createdAt", "updatedAt"]);

    res.json(filteredOffer);
});

module.exports = router;