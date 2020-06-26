const mongoose = require("mongoose"); // Importing mongoose to create a model later

// Creating a list item schema for a to-do-event
const listItemSchema = new mongoose.Schema({
    // Description - what to do
    description: {
        type: String,
        required: true
    },
    // Due Date - when is the event due
    due_date: {
        type: Date,
        required: true
    },
    // Category - what is the type of work/event
    category: {
        type: String,
        required: true
    }
});

const TODOList = mongoose.model("TODO List", listItemSchema); // Creating a mongoose model

module.exports = TODOList; // Exporting the model