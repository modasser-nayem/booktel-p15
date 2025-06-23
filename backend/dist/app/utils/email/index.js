"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHelper = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const template_1 = require("./template");
const logger_1 = __importDefault(require("../logger"));
const verifyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://apilayer.net/api/check?access_key=${config_1.default.MAILBOXLAYER_ACCESS_KEY}&email=${email}&smtp=1&format=1`);
        const data = yield res.json();
        return data.smtp_check;
    }
    catch (error) {
        logger_1.default.error("Email verification failed!");
        return false;
    }
});
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, htmlTemplate, }) {
    const verify = yield verifyEmail(to);
    if (!verify) {
        return;
    }
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.SMTP_HOST,
        port: config_1.default.SMTP_PORT,
        secure: config_1.default.NODE_ENV === "production",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: config_1.default.SMTP_USER,
            pass: config_1.default.SMTP_PASS,
        },
    });
    yield transporter.sendMail({
        from: config_1.default.SMTP_USER, // sender address
        to, // list of receivers
        subject: subject, // Subject line
        html: htmlTemplate, // html body
    });
});
exports.emailHelper = { sendEmail, mailTemplate: template_1.mailTemplate };
