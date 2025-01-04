const News = require("../model/News");
const { param } = require("../routes/NewsRoute");
const findAll = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).json(news)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        res.status(200).json(news)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(news)
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