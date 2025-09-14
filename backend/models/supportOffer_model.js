const mongoose = require('mongoose');

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

module.exports = mongoose.model('SupportOffer', supportOfferSchema);
