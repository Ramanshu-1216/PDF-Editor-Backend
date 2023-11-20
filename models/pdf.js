const  mongoose = require("mongoose");

const PDFSchema = new mongoose.Schema({
    originalFile: {
        type: Buffer,
        required: true,
    },
    editedFile: {
        type: Array,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});
const PDFModel = mongoose.model('PDF', PDFSchema);
module.exports = PDFModel;