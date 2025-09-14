const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 256
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 11
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    },
    favoriteRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportRequest'
    }],
    favoriteOffers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportOffer'
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema, "users");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4,})(?=.*[!@%$#^&*\-_]).{8,}$/;
const phoneRegex = /^\d{9,11}$/;

const validateSignUp = Joi.object({
    fullName: Joi.string().min(2).max(256).required(),
    email: Joi.string().min(5).max(256).email().required(),
    password: Joi.string()
        .pattern(passwordRegex)
        .message("Password must have at least one uppercase, one lowercase, four digits, one special character (!@%$#^&*-_), and be at least 8 characters long")
        .required(),
    isAdmin: Joi.boolean(),
    phone: Joi.string()
        .pattern(phoneRegex)
        .message("Phone must contain 9–11 digits only")
        .required(),
    city: Joi.string().min(2).max(256).required(),
    favoriteRequests: Joi.array().items(Joi.string().hex().length(24)).optional(),
    favoriteOffers: Joi.array().items(Joi.string().hex().length(24)).optional()
});

const validateSignIn = Joi.object({
    email: Joi.string().min(5).max(256).email().required(),
    password: Joi.string().required()
});

const validateUpdate = Joi.object({
    fullName: Joi.string().min(2).max(256).optional(),
    email: Joi.string().min(5).max(256).email().optional(),
    password: Joi.string()
        .pattern(passwordRegex)
        .message("Password must have at least one uppercase, one lowercase, four digits, one special character (!@%$#^&*-_), and be at least 8 characters long")
        .optional(),
    phone: Joi.string()
        .pattern(phoneRegex)
        .message("Phone must contain 9–11 digits only")
        .optional(),
    city: Joi.string().min(2).max(256).optional(),
    favoriteRequests: Joi.array().items(Joi.string().hex().length(24)).optional(),
    favoriteOffers: Joi.array().items(Joi.string().hex().length(24)).optional()
}).min(1);

module.exports = {
    User,
    validateSignUp,
    validateSignIn,
    validateUpdate
};
