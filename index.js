const express = require('express');
const mongoose = require('mongoose');
const verifyToken = require('./utils/verifyToken');
const getUser = require('./api/user/getUser');
const createUser = require('./api/user/createUser');
const editPDF = require('./api/pdf/editPDF');
const app = express();
const cors = require('cors');
const login = require('./api/user/login');
const multer = require('multer');
const port = 8000;
mongoose.connect('mongodb+srv://gawanderamanshu:vHjSRF4oJIZueOe3@cluster0.ejgsotr.mongodb.net/?retryWrites=true&w=majority/PDFEditor')
    .then(() => { console.log("Connected to Database") })
    .catch((error) => { console.log("Error in connection with database: " + error) });

    
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/createUser", createUser);

app.post('/login', login);

app.post('/upload-pdf', verifyToken, upload.single('pdfFile'), editPDF);

app.get("/getUser", verifyToken, getUser);

app.listen(port,
    () => {
        console.log("Server ruinning on port " + port);
    });
    