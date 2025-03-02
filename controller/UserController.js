const User = require("../model/user");
const { param } = require("../routes/UserRoute");
const nodemailer = require("nodemailer");
const findAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const user = new User({
            fullName,
            email,
            password,
            image: req.file?.originalname,
        });

        await user.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "sandhyanepal54@gmail.com",
                pass: "puda xusm fccj uaza",
            },
        });

        const info = await transporter.sendMail({
            from: '"Sandhya Nepal" <sandhyanepal54@gmail.com>',
            to: user.email,
            subject: "User Registration",
            html: `
                <h1>Your Registration has been Completed</h1>
                <p>Your user ID is ${user.id} </p>
                
            `,
        });

        res.status(201).json({ user, emailInfo: info });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};




const findbyId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(user)
    } catch (e) {

        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findbyId,
    deletebyId,
    update
}