const mongoose = require('mongoose');

// Define the Devlog schema
const devlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    changes: { type: String, required: true },
    tags: { type: String } // Optional field
});

// Export the Devlog model
module.exports = mongoose.model('Devlog', devlogSchema);
