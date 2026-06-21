require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("./lib/connectDB");

const { User } = require("./models/user_model");
const { Request } = require("./models/supportRequest_model");
const { Offer } = require("./models/supportOffer_model");
const { Thread } = require("./models/messageThread_model");

async function seedDatabase() {
    try {
        // Connect to database
        await connectDB();

        // Delete existing data
        await Thread.deleteMany({});
        await Offer.deleteMany({});
        await Request.deleteMany({});
        await User.deleteMany({});

        console.log("🗑 Old data deleted");

        // Create one encrypted password for all demo users
        const hashedPassword = await bcrypt.hash("Password1234!", 10);

        // ==========================
        // Create Users
        // ==========================

        const admin = await User.create({
            fullName: "System Admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
            phone: "0501234567",
            city: "תל אביב"
        });

        const userAdmin = await User.create({
            fullName: "Volunteer Manager",
            email: "manager@example.com",
            password: hashedPassword,
            role: "userAdmin",
            phone: "0521112233",
            city: "חיפה"
        });

        const noa = await User.create({
            fullName: "נועה ישראלי",
            email: "noa@example.com",
            password: hashedPassword,
            role: "user",
            phone: "0549876543",
            city: "ירושלים"
        });

        const yuval = await User.create({
            fullName: "יובל כהן",
            email: "yuval@example.com",
            password: hashedPassword,
            role: "user",
            phone: "0537778899",
            city: "באר שבע"
        });

        const daniel = await User.create({
            fullName: "דניאל לוי",
            email: "daniel@example.com",
            password: hashedPassword,
            role: "user",
            phone: "0584443322",
            city: "רמת גן"
        });

        console.log("👤 Demo users created");

        // ==========================
        // Create Requests
        // ==========================

        const request1 = await Request.create({
            requester: noa._id,
            title: "דרוש מחשב נייד ללימודים",
            description: "אני סטודנטית שפונתה מהבית ומחפשת מחשב נייד כדי להמשיך את הלימודים.",
            category: "ציוד אלקטרוני",
            region: "מרכז",
            city: "תל אביב",
            priority: "גבוהה",
            status: "פתוחה",
            requiredQuantity: 1,
            contactMethod: "site"
        });

        const request2 = await Request.create({
            requester: yuval._id,
            title: "זקוק להסעה לבית חולים",
            description: "מחפש מתנדב להסעה לבית החולים איכילוב ביום ראשון בשעות הבוקר.",
            category: "תחבורה",
            region: "מרכז",
            city: "רמת גן",
            priority: "בינונית",
            status: "פתוחה",
            contactMethod: "details",
            contactPhone: "0537778899"
        });

        const request3 = await Request.create({
            requester: daniel._id,
            title: "מחפש אפוד טקטי למילואים",
            description: "גויסתי בצו 8 ואני מחפש אפוד טקטי במצב טוב.",
            category: "ציוד צבאי",
            region: "דרום",
            city: "באר שבע",
            priority: "דחופה",
            status: "בטיפול",
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // בעוד 3 ימים
            requiredQuantity: 1,
            contactMethod: "site"
        });

        const request4 = await Request.create({
            requester: noa._id,
            title: "זקוקים לסלי מזון",
            description: "משפחה עם ארבעה ילדים זקוקה לסלי מזון לשבוע הקרוב.",
            category: "מזון",
            region: "צפון",
            city: "חיפה",
            priority: "גבוהה",
            status: "הושלמה",
            requiredQuantity: 4,
            contactMethod: "details",
            contactEmail: "noa@example.com"
        });

        console.log("📌 Demo requests created");

        // ==========================
        // Create Offers
        // ==========================

        const offer1 = await Offer.create({
            supporter: daniel._id,
            title: "מחשב נייד למסירה",
            description: "מחשב נייד תקין שמתאים ללימודים ולעבודה משרדית.",
            category: "ציוד אלקטרוני",
            region: "מרכז",
            city: "רמת גן",
            status: "פתוחה",
            availableQuantity: 1,
            contactMethod: "site"
        });

        const offer2 = await Offer.create({
            supporter: yuval._id,
            title: "הסעות באזור המרכז",
            description: "יכול להסיע לבתי חולים ולבסיסים בשעות הערב.",
            category: "תחבורה",
            region: "מרכז",
            city: "תל אביב",
            status: "פתוחה",
            contactMethod: "details",
            contactPhone: "0537778899"
        });

        const offer3 = await Offer.create({
            supporter: admin._id,
            title: "חלוקת סלי מזון",
            description: "ניתן לספק סלי מזון למשפחות נזקקות.",
            category: "מזון",
            region: "צפון",
            city: "חיפה",
            status: "בטיפול",
            availableQuantity: 20,
            contactMethod: "site"
        });

        const offer4 = await Offer.create({
            supporter: userAdmin._id,
            title: "ציוד רפואי בסיסי",
            description: "תחבושות, חומרי חיטוי וערכות עזרה ראשונה זמינות למסירה.",
            category: "ציוד רפואי",
            region: "דרום",
            city: "באר שבע",
            status: "פתוחה",
            availableQuantity: 15,
            contactMethod: "details",
            contactEmail: "manager@example.com"
        });

        console.log("🤝 Demo offers created");

        // ==========================
        // Create Message Threads
        // ==========================

        await Thread.create({
            relatedType: "SupportRequest",
            relatedId: request1._id,
            participants: [noa._id, daniel._id],
            messages: [
                {
                    sender: daniel._id,
                    content: "שלום נועה, ראיתי שאת מחפשת מחשב נייד. יש לי אחד שאני יכול למסור."
                },
                {
                    sender: noa._id,
                    content: "איזה יופי! הוא מתאים ללימודים באוניברסיטה?"
                },
                {
                    sender: daniel._id,
                    content: "כן, הוא במצב מצוין וכולל מטען."
                }
            ]
        });

        await Thread.create({
            relatedType: "SupportOffer",
            relatedId: offer2._id,
            participants: [yuval._id, noa._id],
            messages: [
                {
                    sender: noa._id,
                    content: "היי, האם ההסעה עדיין זמינה ליום ראשון?"
                },
                {
                    sender: yuval._id,
                    content: "כן, בשמחה. באיזו שעה את צריכה?"
                },
                {
                    sender: noa._id,
                    content: "בסביבות 08:00 בבוקר."
                },
                {
                    sender: yuval._id,
                    content: "מעולה, אאסוף אותך בזמן."
                }
            ]
        });

        console.log("💬 Demo message threads created");

        // ==========================
        // Add Favorites
        // ==========================

        noa.favoriteRequests.push({
            request: request3._id
        });

        noa.favoriteOffers.push({
            offer: offer2._id
        });

        yuval.favoriteRequests.push({
            request: request1._id
        });

        daniel.favoriteOffers.push({
            offer: offer1._id
        });

        await noa.save();
        await yuval.save();
        await daniel.save();

        console.log("⭐ Demo favorites created");

        console.log("🎉 Database seeded successfully!");

    } catch (err) {
        console.error("❌ Seed failed:", err);
    } finally {
        await mongoose.connection.close();
        console.log("🔒 Database connection closed");
    }
}

seedDatabase();