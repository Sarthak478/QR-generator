const QR = require("../models/QR");
const QRCode = require("qrcode");
const shortid = require("shortid");

exports.generateQR = async (req, res) => {

    const { text, type, expiry, password, oneTime } = req.body;

    const short = shortid.generate();

    const redirectUrl = `${process.env.BASE_URL}/r/${short}`;

    const qrImage = await QRCode.toDataURL(redirectUrl);

    await QR.create({
        userId: req.userId,
        text,
        type,
        shortId: short,
        expiryDate: expiry || null,
        password,
        oneTime: oneTime === 'on'
    });

    res.render("generate", { qrImage });

};


exports.dashboard = async (req, res) => {

    const qrs = await QR.find({ userId: req.userId });

    res.render("dashboard", { qrs });

};