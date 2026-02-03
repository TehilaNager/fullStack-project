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
    role: {
        type: String,
        enum: ['user', 'admin', 'userAdmin'],
        default: 'user'
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
        request: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportRequest' },
        addedAt: { type: Date, default: Date.now }
    }],
    favoriteOffers: [{
        offer: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportOffer' },
        addedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema, "users");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4,})(?=.*[!@%$#^&*\-_]).{8,}$/;
const phoneRegex = /^0\d{8,10}$/;
const passwordMessage = "Password must have at least one uppercase, one lowercase, four digits, one special character (!@%$#^&*-_), and be at least 8 characters long"
const phonemMessage = "Phone must start with 0 and contain 9–11 digits";

const validateSignUp = Joi.object({
    fullName: Joi.string().min(2).max(256).required(),
    email: Joi.string().min(5).max(256).email().required(),
    password: Joi.string()
        .pattern(passwordRegex)
        .message(passwordMessage)
        .required(),
    phone: Joi.string()
        .pattern(phoneRegex)
        .message(phonemMessage)
        .required(),
    city: Joi.string().min(2).max(256).required(),
    favoriteRequests: Joi.array().items(Joi.string().hex().length(24)).optional(),
    favoriteOffers: Joi.array().items(Joi.string().hex().length(24)).optional()
});

const validateSignIn = Joi.object({
    email: Joi.string().min(5).max(256).email().required(),
    password: Joi.string()
        .pattern(passwordRegex)
        .message(passwordMessage)
        .required(),
});

const validateUpdate = Joi.object({
    fullName: Joi.string().min(2).max(256).optional(),
    email: Joi.string().min(5).max(256).email().optional(),
    password: Joi.string()
        .pattern(passwordRegex)
        .message(passwordMessage)
        .optional(),
    phone: Joi.string()
        .pattern(phoneRegex)
        .message(phonemMessage)
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
