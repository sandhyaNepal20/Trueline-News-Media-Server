const News = require("../model/News");
const { param } = require("../routes/NewsRoute");
const findAll = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        const news = await News.find(query).populate(["userId", "categoryId"]);
        res.status(200).json(news);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



const save = async (req, res) => {
    try {
        const { userId, categoryId, title, content, created_at } = req.body
        const news = new News({
            userId,
            categoryId,
            title,
            content,
            created_at,
            image: req.file.originalname
        });
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


const findByCategory = async (req, res) => {
    try {
        // Retrieve the categoryId from the URL parameters
        const { categoryId } = req.params;
        // Query the database to find news articles matching the categoryId
        const newsArticles = await News.find({ categoryId }).populate(["userId", "categoryId"]);
        res.status(200).json(newsArticles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    save,
    findbyId,
    deletebyId,
    update,
    findByCategory
}