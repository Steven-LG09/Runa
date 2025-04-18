import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(process.env.STATIC));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + process.env.MAIN);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});