const PDFModel = require("../../models/pdf");
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const UserModel = require("../../models/user");

const editPDF = async (req, res) => {
    var uploadedFile = req.file;
    var newOrder = req.body.newOrder;
    const userID = req.user.userID;

    if (!uploadedFile || !newOrder) {
        uploadedFile = String(fs.readFileSync('/home/ramanshu/Downloads/somatosensory.pdf', 'utf-8'));
        res.status(400).json({
            error: 'Provide buffer of pdf in base64',
            msg: 'Provide buffer of pdf in base64',
        });
        return;
    }

    try {
        newOrder = JSON.parse(newOrder);

        const pdfDoc = await PDFDocument.create();
        const uploadedFileBuffer = uploadedFile.buffer;
        const originalPDF = await PDFDocument.load(uploadedFileBuffer);

        newOrder.forEach((index) => {
            if (index >= originalPDF.getPageCount()) {
                res.status(400).json({
                    error: 'Index provided is greater than pages in original file: ' + index,
                    msg: 'Index provided is greater than pages in original file: ' + index,
                });
                return;
            }
        });

        const pages = await pdfDoc.copyPages(originalPDF, newOrder);
        pages.forEach((page) => {
            pdfDoc.addPage(page);
        });

        const pdfBytes = await pdfDoc.save();

        const pdfModel = new PDFModel({
            originalFile: uploadedFileBuffer,
            editedFile: pdfBytes,
        });
        await pdfModel.save();
        await UserModel.findByIdAndUpdate(userID, { $push: { pdfs: pdfModel._id } });
        fs.writeFileSync('output.pdf', pdfBytes);
        res.download(`/home/ramanshu/Calls/PDFApp/backend/output.pdf`, 'output.pdf', (error) => {
            if(error){
                console.log(error);
            }
            else{

            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            msg: 'Error',
        });
        return;
    }
}

module.exports = editPDF;