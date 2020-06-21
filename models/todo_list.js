const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    } ,
    isSelected: {
        type: Boolean,
        default: false
    }
});

const TODOList = mongoose.model("TODO List", listItemSchema);

module.exports = TODOList;