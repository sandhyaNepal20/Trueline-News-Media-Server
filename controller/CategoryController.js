const Category = require("../model/Category");
const { param } = require("../routes/CategoryRoute");
const findAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const categories = new Category(req.body);
        await categories.save();
        res.status(201).json(categories)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const categories = await Category.findById(req.params.id);
        res.status(200).json(categories)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const categories = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const categories = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(categories)
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