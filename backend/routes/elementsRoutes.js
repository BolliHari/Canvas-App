import express from 'express';
import { initializeCanvas, addElements, ExportAsPDF } from '../controllers/elememtsController.js';


const elementsRouter = express.Router()

elementsRouter.post('/init',initializeCanvas);
elementsRouter.post('/add',addElements);
elementsRouter.get('/export/pdf',ExportAsPDF);

export default elementsRouter
