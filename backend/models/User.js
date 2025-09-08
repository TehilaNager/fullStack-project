const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, required: true },
    city: String,
    favoriteRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupportRequest' }],
    favoriteOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupportOffer' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
