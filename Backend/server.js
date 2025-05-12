import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from "mongoose";
import DOMPurify from "dompurify";
import {
    JSDOM
} from "jsdom";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const formSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Form = mongoose.models[process.env.COLLECTION_NAME] || mongoose.model(process.env.COLLECTION_NAME, formSchema);

const window = new JSDOM("").window;
const purify = DOMPurify(window);

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.post('/form', async (req, res) => {
    try {
        const {
            name,
            email
        } = req.body;

        const sanitizedName = purify.sanitize(name);
        const sanitizedEmail = purify.sanitize(email);

        if (!sanitizedName || !sanitizedEmail) {
            return res.status(400).json({
                success: false,
                message: "Información requerida",
            });
        }

        const newEvaluation = new Form({
            name: sanitizedName,
            email: sanitizedEmail
        });
        await newEvaluation.save();

        res.json({
            message: "Upload successful",
            success: true,
            redirectUrl: process.env.FORM
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});