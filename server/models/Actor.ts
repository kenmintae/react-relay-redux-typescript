import * as mongoose from 'mongoose';

export default new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
});
