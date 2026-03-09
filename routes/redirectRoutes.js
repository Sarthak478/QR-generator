const router = require("express").Router();
const QR = require("../models/QR");

router.get("/r/:id", async (req, res) => {

    const qr = await QR.findOne({ shortId: req.params.id });

    if (!qr || !qr.isActive)
        return res.send("QR inactive");

    if (qr.expiryDate && qr.expiryDate < new Date())
        return res.send("QR expired");

    qr.scanCount++;

    if (qr.oneTime && qr.scanCount > 1)
        qr.isActive = false;

    await qr.save();

    res.redirect(qr.text);

});

module.exports = router;