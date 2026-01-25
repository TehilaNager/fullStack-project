const mongoose = require('mongoose');
const Joi = require("joi");

const supportOfferSchema = new mongoose.Schema({
    supporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['ציוד צבאי', 'ביגוד', 'מזון', 'תחבורה', 'ציוד אלקטרוני', 'ספרים וחומרי לימוד', 'ציוד רפואי', 'תמיכה נפשית וחברתית', 'אחר'],
        required: true
    },
    region: { type: String, enum: ['צפון', 'מרכז', 'דרום'], required: true },
    city: { type: String, required: true },
    status: { type: String, enum: ['פתוחה', 'בטיפול', 'הושלמה'], default: 'פתוחה' },
    availableQuantity: { type: Number, required: true, min: 1 },
    availableUntil: { type: Date },
    contactPhone: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
}, { timestamps: true });

const Offer = mongoose.model('SupportOffer', supportOfferSchema, "offers");

const validateOffer = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(5).max(1024).required(),
    category: Joi.string()
        .valid('ציוד צבאי', 'ביגוד', 'מזון', 'תחבורה', 'ציוד אלקטרוני', 'ספרים וחומרי לימוד', 'ציוד רפואי', 'תמיכה נפשית וחברתית', 'אחר')
        .required(),
    region: Joi.string().valid('צפון', 'מרכז', 'דרום').required(),
    city: Joi.string().min(2).max(256).required(),
    status: Joi.string().valid('פתוחה', 'בטיפול', 'הושלמה').optional(),
    availableQuantity: Joi.number().min(1).required(),
    availableUntil: Joi.date().optional(),
    contactPhone: Joi.string().pattern(/^05\d{8}$/).optional(),
    contactEmail: Joi.string().email().optional(),
});

const validateOfferUpdate = Joi.object({
    title: Joi.string().min(2).max(256).optional(),
    description: Joi.string().min(5).max(1024).optional(),
    category: Joi.string()
        .valid('ציוד צבאי', 'ביגוד', 'מזון', 'תחבורה', 'ציוד אלקטרוני', 'ספרים וחומרי לימוד', 'ציוד רפואי', 'תמיכה נפשית וחברתית', 'אחר')
        .optional(),
    region: Joi.string().valid('צפון', 'מרכז', 'דרום').optional(),
    city: Joi.string().min(2).max(256).optional(),
    status: Joi.string().valid('פתוחה', 'בטיפול', 'הושלמה').optional(),
    availableQuantity: Joi.number().min(1).optional(),
    availableUntil: Joi.date().optional(),
    contactPhone: Joi.string().pattern(/^05\d{8}$/).optional(),
    contactEmail: Joi.string().email().optional(),
}).min(1);

module.exports = {
    Offer,
    validateOffer,
    validateOfferUpdate
}
