const Notifications = require("../model/Notifications");
const { param } = require("../routes/NotificationsRoute");
const findAll = async (req, res) => {
    try {
        const notifications = await Notifications.find();
        res.status(200).json(notifications);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const notifications = new Notifications(req.body);
        await notifications.save();
        res.status(201).json(notifications)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const notifications = await Notifications.findById(req.params.id);
        res.status(200).json(notifications)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const notifications = await Notifications.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const notifications = await Notifications.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(notifications)
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