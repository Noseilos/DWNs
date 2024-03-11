import path from 'path'
import express from 'express'
import User from "../models/userModel.js";
import multer from 'multer'
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/users/'); // Null is for error
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

function checkFileType(file, cb){
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase);
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,    
});

router.post('/', upload.single('image'), async (req, res) => {

    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`,
    });
});

router.put('/:userId', upload.single('image'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.image = `/${req.file.path}`;
        await user.save();

        res.send({
            message: 'User image updated',
            image: user.image,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;