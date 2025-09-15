const mongoose = require('mongoose');
const Joi = require("joi");

const supportOfferSchema = new mongoose.Schema({
    supporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['ציוד', 'אוכל ושתייה', 'תחבורה והסעות', 'סיוע כספי', 'תמיכה נפשית וחברתית', 'שירותים ולוגיסטיקה', 'בריאות ורפואה', 'הוואי ומורל', 'אחר'],
        required: true
    },
    location: {
        region: { type: String, enum: ['צפון', 'מרכז', 'דרום'], required: true },
        city: { type: String, required: true }
    },
    status: { type: String, enum: ['פתוחה', 'הושלמה'], default: 'פתוחה' }
}, { timestamps: true });

const Offer = mongoose.model('SupportOffer', supportOfferSchema);

const validateOffer = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(5).max(1024).required(),
    category: Joi.string()
        .valid('ציוד', 'אוכל ושתייה', 'תחבורה והסעות', 'סיוע כספי', 'תמיכה נפשית וחברתית', 'שירותים ולוגיסטיקה', 'בריאות ורפואה', 'הוואי ומורל', 'אחר')
        .required(),
    location: Joi.object({
        region: Joi.string().valid('צפון', 'מרכז', 'דרום').required(),
        city: Joi.string().min(2).max(256).required()
    }).required(),
    status: Joi.string().valid('פתוחה', 'הושלמה').optional()
});

const validateOfferUpdate = Joi.object({
    title: Joi.string().min(2).max(256).optional(),
    description: Joi.string().min(5).max(1024).optional(),
    category: Joi.string()
        .valid('ציוד', 'אוכל ושתייה', 'תחבורה והסעות', 'סיוע כספי', 'תמיכה נפשית וחברתית', 'שירותים ולוגיסטיקה', 'בריאות ורפואה', 'הוואי ומורל', 'אחר')
        .optional(),
    location: Joi.object({
        region: Joi.string().valid('צפון', 'מרכז', 'דרום').optional(),
        city: Joi.string().min(2).max(256).optional()
    }).optional(),
    status: Joi.string().valid('פתוחה', 'הושלמה').optional()
}).min(1);

module.exports = {
    Offer,
    validateOffer,
    validateOfferUpdate
}
