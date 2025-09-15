const mongoose = require('mongoose');
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const messageThreadSchema = new mongoose.Schema({
    relatedType: { type: String, enum: ['SupportRequest', 'SupportOffer'], required: true },
    relatedId: { type: mongoose.Schema.Types.ObjectId, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [messageSchema]
}, { timestamps: true });

const Thread = mongoose.model('MessageThread', messageThreadSchema, "threads");

const validateMessageThread = Joi.object({
    relatedType: Joi.string().valid('SupportRequest', 'SupportOffer').required(),
    relatedId: Joi.string().hex().length(24).required(),
    participants: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
    initialMessage: Joi.string().min(1).max(1000).optional()
});

module.exports = {
    Thread,
    validateMessageThread
}