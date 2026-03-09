const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {

    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashed
    });

    res.redirect("/login");

};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.send("Wrong password");

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.redirect("/dashboard");

};

exports.logout = (req, res) => {

    res.clearCookie("token");
    res.redirect("/login");

};