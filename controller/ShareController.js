const Share = require("../model/Share");

const findAll = async (req, res) => {
    try {
        const shares = await Share.find();
        res.status(200).json(shares);
    } catch (e) {
        res.json(e);
    }
};

const save = async (req, res) => {
    try {
        const share = new Share(req.body);
        await share.save();
        res.status(201).json(share);
    } catch (e) {
        res.json(e);
    }
};

const findbyId = async (req, res) => {
    try {
        const share = await Share.findById(req.params.id);
        res.status(200).json(share);
    } catch (e) {
        res.json(e);
    }
};

const deletebyId = async (req, res) => {
    try {
        await Share.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted");
    } catch (e) {
        res.json(e);
    }
};

const update = async (req, res) => {
    try {
        const share = await Share.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(share);
    } catch (e) {
        res.json(e);
    }
};

module.exports = {
    findAll,
    save,
    findbyId,
    deletebyId,
    update
};
