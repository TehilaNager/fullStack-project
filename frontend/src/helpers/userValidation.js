import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4,})(?=.*[!@%$#^&*\-_]).{8,}$/;
const phoneRegex = /^0\d{8,10}$/;

const passwordMessage = "הסיסמה חייבת להכיל לפחות אות גדולה, אות קטנה, ארבע ספרות, תו מיוחד (!@%$#^&*-_) ולהיות באורך של לפחות 8 תווים";
const phoneMessage = "מספר הטלפון חייב להתחיל ב-0 ולהכיל בין 9 ל-11 ספרות";

const validateSignUp = Joi.object({
    fullName: Joi.string()
        .min(2)
        .max(256)
        .required()
        .messages({
            "string.base": "שם מלא חייב להיות טקסט",
            "string.empty": "יש למלא שם מלא",
            "string.min": "שם מלא חייב להכיל לפחות 2 תווים",
            "string.max": "שם מלא לא יכול להיות ארוך מ-256 תווים",
            "any.required": "שם מלא הוא שדה חובה"
        }),
    email: Joi.string()
        .min(5)
        .max(256)
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.base": "כתובת אימייל לא חוקית",
            "string.empty": "יש למלא אימייל",
            "string.email": "האימייל לא תקין",
            "string.min": "אימייל חייב להכיל לפחות 5 תווים",
            "string.max": "אימייל לא יכול להיות ארוך מ-256 תווים",
            "any.required": "אימייל הוא שדה חובה"
        }),
    password: Joi.string()
        .pattern(passwordRegex)
        .message(passwordMessage)
        .required()
        .messages({
            "string.base": "הסיסמה לא תקינה",
            "any.required": "יש למלא סיסמה"
        }),
    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "סיסמה ואימות סיסמה חייבים להיות זהים",
            "any.required": "יש למלא אימות סיסמה"
        }),
    phone: Joi.string()
        .pattern(phoneRegex)
        .message(phoneMessage)
        .required()
        .messages({
            "string.base": "מספר הטלפון חייב להכיל רק ספרות",
            "any.required": "יש למלא מספר טלפון"
        }),
    city: Joi.string()
        .min(2)
        .max(256)
        .required()
        .messages({
            "string.base": "עיר חייבת להיות טקסט",
            "string.empty": "יש למלא עיר מגורים",
            "string.min": "עיר חייבת להכיל לפחות 2 תווים",
            "string.max": "עיר לא יכולה להיות ארוכה מ-256 תווים",
            "any.required": "עיר היא שדה חובה"
        }),
    favoriteRequests: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional(),
    favoriteOffers: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional()
});

const validateSignIn = Joi.object({
    email: Joi.string()
        .min(5)
        .max(256)
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.base": "כתובת אימייל לא חוקית",
            "string.empty": "יש למלא אימייל",
            "string.email": "האימייל לא תקין",
            "string.min": "אימייל חייב להכיל לפחות 5 תווים",
            "string.max": "אימייל לא יכול להיות ארוך מ-256 תווים",
            "any.required": "אימייל הוא שדה חובה"
        }),
    password: Joi.string()
        .pattern(passwordRegex)
        .message(passwordMessage)
        .required()
        .messages({
            "string.base": "הסיסמה לא תקינה",
            "any.required": "יש למלא סיסמה"
        })
});

const validateUpdate = Joi.object({
    fullName: Joi.string()
        .min(2)
        .max(256)
        .optional()
        .messages({
            "string.base": "שם מלא חייב להיות טקסט",
            "string.min": "שם מלא חייב להכיל לפחות 2 תווים",
            "string.max": "שם מלא לא יכול להיות ארוך מ-256 תווים"
        }),
    email: Joi.string()
        .min(5)
        .max(256)
        .email({ tlds: { allow: false } })
        .optional()
        .messages({
            "string.base": "האימייל חייב להיות טקסט",
            "string.email": "האימייל לא תקין",
            "string.min": "אימייל חייב להכיל לפחות 5 תווים",
            "string.max": "אימייל לא יכול להיות ארוך מ-256 תווים"
        }),
    password: Joi.string()
        .pattern(passwordRegex)
        .message(passwordMessage)
        .optional()
        .messages({
            "string.base": "הסיסמה לא תקינה"
        }),
    phone: Joi.string()
        .pattern(phoneRegex)
        .message(phoneMessage)
        .optional()
        .messages({
            "string.base": "מספר הטלפון חייב להכיל רק ספרות"
        }),
    city: Joi.string()
        .min(2)
        .max(256)
        .optional()
        .messages({
            "string.base": "עיר חייבת להיות טקסט",
            "string.min": "עיר חייבת להכיל לפחות 2 תווים",
            "string.max": "עיר לא יכולה להיות ארוכה מ-256 תווים"
        }),
    favoriteRequests: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional(),
    favoriteOffers: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional()
}).min(1);

export {
    validateSignUp,
    validateSignIn,
    validateUpdate
};

