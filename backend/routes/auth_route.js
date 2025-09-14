const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const { User, validateSignUp, validateSignIn } = require("../models/user_model");

router.post("/register", async (req, res) => {
    const { error, value } = validateSignUp.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    };

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        res.status(400).send("This email is already registered.");
        return;
    }

    user = await new User({
        ...value,
        password: await bcrypt.hash(req.body.password, 14)
    }).save();

    res.send(_.pick(user, ["_id", "fullName", "email", "isAdmin", "phone", "city", "favoriteRequests", "favoriteOffers", "createdAt", "updatedAt"]));
});

router.post("/login", async (req, res) => {
    const { error } = validateSignIn.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send("Invalide email.");
        return;
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        res.status(400).send("Invalide password.");
        return;
    }

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_KEY);

    res.send({ token });
});

module.exports = router;
