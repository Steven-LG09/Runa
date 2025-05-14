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
    email: String,
    phone: String,
    visitortype: String,
    date: String,
    time: String,
    quantity: String,
    walktype: String,
    comments: String,
    accesability: String,
    terms: String,
    notifications: String,
    status: String
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
            email,
            phone,
            visitortype,
            date,
            time,
            quantity,
            walktype,
            comments,
            accesability,
            terms,
            notifications
        } = req.body;

        const sanitizedName = purify.sanitize(name);
        const sanitizedEmail = purify.sanitize(email);
        const sanitizedPhone = purify.sanitize(phone);
        const sanitizedQuantity = purify.sanitize(quantity);
        const sanitizedComments = purify.sanitize(comments);

        if (!sanitizedName || !sanitizedEmail || !sanitizedPhone || !sanitizedQuantity || !sanitizedComments) {
            return res.status(400).json({
                success: false,
                message: "Información requerida",
            });
        }

        const newEvaluation = new Form({
            name: sanitizedName,
            email: sanitizedEmail,
            phone: sanitizedPhone,
            visitortype: visitortype,
            date: date,
            time: time,
            quantity: sanitizedQuantity,
            walktype: walktype,
            comments: sanitizedComments,
            accesability: accesability,
            terms: terms,
            notifications: notifications,
            status: "Pendiente"
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
app.post('/login', async (req, res) => {
    try {
        const {
            user,
            password
        } = req.body;

        const sanitizedUser = purify.sanitize(user);
        const sanitizedPassword = purify.sanitize(password);

        if (!sanitizedUser || !sanitizedPassword) {
            return res.status(400).json({
                success: false,
                message: "Información requerida",
            });
        }

        if (sanitizedUser == "admin" && sanitizedPassword == "test2025") {
            res.json({
                message: "Upload successful",
                success: true,
                redirectUrl: process.env.MAINPRI
            });
        } else {
            res.json({
                message: "Credenciales incorrectas",
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.get('/reserv', async (req, res) => {
    try {
        const reservations = await Form.find({}, {
            email: 0,
            phone: 0,
            visitortype: 0,
            date: 0,
            time: 0,
            quantity: 0,
            walktype: 0,
            comments: 0,
            accesability: 0,
            terms: 0,
            notifications: 0,
            status: 0,
            _id: 0
        });
        res.json(reservations);
    } catch (error) {
        console.error("Error al obtener reservas:", error); // Esto te dará más información en los logs
        res.status(500).json({
            error: 'Error al obtener reservas',
            message: error.message
        });
    }
});
app.post('/form2', async (req, res) => {
    try {
        const {
            name,
            visitortype,
            date,
            time,
            quantity,
            walktype,
            comments,
            accesability
        } = req.body;

        const sanitizedQuantity = purify.sanitize(quantity);
        const sanitizedComments = purify.sanitize(comments);

        if (!sanitizedQuantity || !sanitizedComments) {
            return res.status(400).json({
                success: false,
                message: "Información requerida",
            });
        }

        // Buscar en la base de datos
        const resultado = await Form.findOne({
            name: name
        });

        if (!resultado) {
            return res.status(404).json({
                error: 'No encontrado'
            });
        }

        const newEvaluation = new Form({
            name: name,
            email: resultado.email,
            phone: resultado.phone,
            visitortype: visitortype,
            date: date,
            time: time,
            quantity: sanitizedQuantity,
            walktype: walktype,
            comments: sanitizedComments,
            accesability: accesability,
            terms: resultado.terms,
            notifications: resultado.notifications,
            status: "Pendiente"
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
app.post('/search', async (req, res) => {
    try {
        const {
            code
        } = req.body;

        const sanitizedCode = purify.sanitize(code);

        // Validar que haya un código
        if (!sanitizedCode) {
            return res.status(400).json({
                error: 'Código requerido'
            });
        }

        // Buscar en la base de datos
        const resultado = await Form.findOne({
            phone: sanitizedCode
        });

        if (!resultado) {
            return res.status(404).json({
                error: 'No encontrado'
            });
        }

        // Enviar los datos encontrados al frontend
        res.json(resultado);
    } catch (err) {
        console.error('Error en búsqueda:', err);
        res.status(500).json({
            error: 'Error en la busqueda'
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});