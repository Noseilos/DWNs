import asyncHandler from "../middleware/asyncHandler.js";
import Waste from "../models/wasteModel.js";

const createWaste = asyncHandler(async (req, res) => {
    const {
        name,
        image,
    } = req.body

    const waste = new Waste({
        user: req.user._id,
        name,
        image,
    });

    const createdWaste = await waste.save();
    res.status(201).json(createdWaste);
    res.send(createdWaste);
});

const getWasteById = asyncHandler(async (req, res) => {
    const waste = await Waste.findById(req.params.id);

    if (waste) {
        return res.json(waste);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const updateWaste = asyncHandler(async (req, res) => {
    const { name, image } = req.body;

    const waste = await Waste.findById(req.params.id);

    if (waste) {
        waste.name = name,
        waste.image = image

        const updatedWaste = await waste.save();
        res.json(updatedWaste);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const deleteWaste = asyncHandler(async (req, res) => {
    const waste = await Waste.findById(req.params.id);

    if (waste) {
        await Waste.deleteOne({ _id: waste._id })
        res.status(200).json({ message: 'Waste deleted' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const getWastes = asyncHandler(async (req, res) => {
    const wastes = await Waste.find({});
    res.status(200).json(wastes);
});

export {
    createWaste,
    getWasteById,
    updateWaste,
    deleteWaste,
    getWastes
}