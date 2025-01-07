const Comment = require("../model/Comment");
const { param } = require("../routes/CommentRoute");
const findAll = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const comments = new Comment(req.body);
        await comments.save();
        res.status(201).json(comments)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const comments = await Comment.findById(req.params.id);
        res.status(200).json(comments)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const comments = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const comments = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(comments)
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