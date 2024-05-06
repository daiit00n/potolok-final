const House = require('../models/House');

const createHouse = async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        const house = await House.create({
            title,
            description,
            price,
            location,
            owner: req.userId
        });
        res.status(201).json({ house });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllHouses = async (req, res) => {
    try {
        const houses = await House.find().sort({ createdAt: -1 });
        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHouse = async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }
        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateHouse = async function(req, res) {
    try {
        const { id } = req.params;
        const { title, description, price, location } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, description, price, location },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Пост не найден" });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const deleteHouse = async function(req, res) {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(204).json({ message: "Пост был успешно удален" });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

module.exports = {
    createHouse,
    getAllHouses,
    getHouse,
    updateHouse,
    deleteHouse
};
