const mongoose = require('mongoose');

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

module.exports = mongoose.model('MessageThread', messageThreadSchema);