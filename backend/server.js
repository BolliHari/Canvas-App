import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import elementsRouter from './routes/elementsRoutes.js';

const app = express();
const PORT = 5000;

// Middleware setup
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/api/canvas',elementsRouter)

if(process.env.NODE_ENV !== 'production'){
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app
