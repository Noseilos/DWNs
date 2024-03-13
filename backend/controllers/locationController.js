import asyncHandler from "../middleware/asyncHandler.js";
import Location from "../models/locationModel.js";

const createLocation = asyncHandler(async (req, res) => {
    const {
        name,
        image,
    } = req.body

    const location = new Location({
        user: req.user._id,
        name,
        image,
    });

    const createdLocation = await location.save();
    res.status(201).json(createdLocation);
    res.send(createdLocation);
});

const getLocationById = asyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id);

    if (location) {
        return res.json(location);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const updateLocation = asyncHandler(async (req, res) => {
    const { name, image } = req.body;

    const location = await Location.findById(req.params.id);

    if (location) {
        location.name = name,
        location.image = image

        const updatedLocation = await location.save();
        res.json(updatedLocation);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const deleteLocation = asyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id);

    if (location) {
        await Location.deleteOne({ _id: location._id })
        res.status(200).json({ message: 'Location deleted' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const getLocations = asyncHandler(async (req, res) => {
    const locations = await Location.find({});
    res.status(200).json(locations);
});

export {
    createLocation,
    getLocationById,
    updateLocation,
    deleteLocation,
    getLocations
}