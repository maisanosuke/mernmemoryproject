import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [100, "{VALUE} exceeeded max length of 100"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        maxLength: [254, "{VALUE} exceeeded max length of 254"]
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required',
        maxLength: [254, "{VALUE} exceeeded max length of 254"]
    }
})

const User = mongoose.model('User', userSchema);

export default User;