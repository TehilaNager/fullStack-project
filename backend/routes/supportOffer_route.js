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

    const filteredOffer = _.pick(newOffer, ["_id", "supporter", "title", "description", "category", "region", "city", "status", "availableQuantity", "availableUntil", "contactInfo", "createdAt", "updatedAt"]);

    res.json(filteredOffer);

});

router.get("/", async (req, res) => {
    const { search, category, region, city, status } = req.query;

    let filter = {};

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } }
        ];
    }

    if (category) filter.category = category;
    if (region) filter.region = region;
    if (city) filter.city = city;
    if (status) filter.status = status;

    const offers = await Offer.find(filter, { __v: 0 }).sort({ createdAt: -1 });
    res.json(offers);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const offer = await Offer.findById(req.params.id, { __v: 0 });

    if (!offer) {
        res.status(404).send("Offer not found.");
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
        res.status(404).send("Offer not found.");
        return;
    }

    const isUser = offer.supporter.toString() === req.user._id.toString();
    const isUserAdmin = req.user.role === "userAdmin";
    const isAdmin = req.user.role === "admin";

    if (!isUser && !isUserAdmin && !isAdmin) {
        res.status(403).send("Access denied. Only the offer owner, a userAdmin, or an admin can update it.");
        return;
    }

    Object.assign(offer, value);
    await offer.save();

    const filteredOffer = _.pick(offer, ["_id", "supporter", "title", "description", "category", "region", "city", "status", "availableQuantity", "availableUntil", "contactInfo", "createdAt", "updatedAt"]);

    res.json(filteredOffer);
});

router.delete("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const offer = await Offer.findById(req.params.id);

    if (!offer) {
        res.status(404).send("Offer not found.");
        return;
    }

    const isUser = offer.supporter.toString() === req.user._id.toString();
    const isUserAdmin = req.user.role === "userAdmin";
    const isAdmin = req.user.role === "admin";


    if (!isUser && !isUserAdmin && !isAdmin) {
        res.status(403).send("Access denied. Only the offer owner, a userAdmin, or an admin can delete it.");
        return;
    }

    await offer.deleteOne();

    const filteredOffer = _.pick(offer, ["_id", "supporter", "title", "description", "category", "region", "city", "status", "availableQuantity", "availableUntil", "contactInfo", "createdAt", "updatedAt"]);

    res.json(filteredOffer);
});

router.patch("/:id/status", authMW, async (req, res) => {
    const { status } = req.body;

    if (!['פתוחה', 'בטיפול', 'הושלמה'].includes(status)) {
        return res.status(400).send("Invalid status value");
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid offer ID");
    }

    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).send("Offer not found");

    const isOwner = offer.supporter.toString() === req.user._id.toString();
    const isUserAdmin = req.user.role === "userAdmin";
    const isAdmin = req.user.role === "admin";


    if (!isOwner && !isUserAdmin && !isAdmin) {
        return res.status(403).send("Access denied. Only the supporter, a userAdmin, or an admin can change the status.");
    }

    offer.status = status;
    await offer.save();

    res.json(_.pick(offer, ["_id", "status"]));
});

module.exports = router;