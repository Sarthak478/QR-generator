require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const redirectRoutes = require("./routes/redirectRoutes");

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(authRoutes);
app.use(qrRoutes);
app.use(redirectRoutes);

app.get("/", (req, res) => res.redirect("/dashboard"));

app.listen(3000, () => {
    console.log("QRify running");
});
