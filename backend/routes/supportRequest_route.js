const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");

const authMW = require("../middleware/auth");

const { Request, validateRequest, validateRequestUpdate } = require("../models/supportRequest_model");

router.post("/", authMW, async (req, res) => {
    const { error, value } = validateRequest.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const newRequest = await new Request({
        ...value,
        requester: req.user._id
    }).save();

    const filteredRequest = _.pick(newRequest, ["_id", "requester", "title", "description", "category", "region", "city", "status", "createdAt", "updatedAt"]);

    res.json(filteredRequest);
});

router.get("/", async (req, res) => {
    const { search, category, region, city, priority, status } = req.query;

    let filter = {};

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    if (category) filter.category = category;
    if (region) filter.region = region;
    if (city) filter.city = city;
    if (priority) filter.priority = priority;
    if (status) filter.status = status;

    const requests = await Request.find(filter, { __v: 0 }).sort({ createdAt: -1 });
    res.json(requests);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const request = await Request.findById(req.params.id, { __v: 0 });

    if (!request) {
        res.status(400).send("Request not found.");
        return;
    }

    res.json(request);
});

router.put("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const { error, value } = validateRequestUpdate.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
        res.status(400).send("Request not found.");
        return;
    }

    const isUser = request.requester.toString() === req.user._id;
    const isAdmin = req.user.isAdmin;

    if (!isUser && !isAdmin) {
        res.status(400).send("Access denied. Only an admin or the user who created the request can update it.");
        return;
    }

    Object.assign(request, value);
    await request.save();

    const filteredRequest = _.pick(request, ["_id", "requester", "title", "description", "category", "region", "city", "status", "createdAt", "updatedAt"]);

    res.json(filteredRequest);
});

router.delete("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
        res.status(400).send("Request not found.");
        return;
    }

    const isUser = request.requester.toString() === req.user._id;
    const isAdmin = req.user.isAdmin;

    if (!isUser && !isAdmin) {
        res.status(400).send("Access denied. Only an admin or the user who created this request can delete it.");
        return;
    }

    const deletedRequest = await Request.findByIdAndDelete(req.params.id);

    const filteredRequest = _.pick(deletedRequest, ["_id", "requester", "title", "description", "category", "region", "city", "status", "createdAt", "updatedAt"]);

    res.json(filteredRequest);
});














module.exports = router;