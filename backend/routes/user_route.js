const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, validateSignUp } = require("../models/user_model");

router.post("/", async (req, res) => {
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

module.exports = router;
