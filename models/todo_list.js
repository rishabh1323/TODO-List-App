const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    is_selected: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    }
});

const TODOList = mongoose.model("TODO List", listItemSchema);

module.exports = TODOList;