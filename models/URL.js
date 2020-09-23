const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    longURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    },
    shortURLId: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("URL", urlSchema);