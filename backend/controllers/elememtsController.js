import canvasManager from '../canvasService.js';


export const initializeCanvas = async (req, res) => {
    const { width, height, designName } = req.body;
    
    if (!width || !height) {
        return res.status(400).json({ message: 'Width and height are required.'});
    }
    try {
        canvasManager.initialize(width, height);
        const initialImage = canvasManager.getCanvasPreview();
        res.json({ message: `Canvas '${designName}' initialized.`, image: initialImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to initialize canvas on server.' });
    }
}

export const ExportAsPDF = async (req, res) => {
    if (!canvasManager.canvas) {
        return res.status(400).send('Canvas must be initialized first.');
    }
    canvasManager.exportToPDF(res);
}


export const addElements = async (req, res) => { 
    const elementData = req.body;
    if (!canvasManager.canvas) {
        return res.status(400).json({ message: 'Canvas must be initialized first.'});
    }
    try {
        await canvasManager.addElement(elementData); 
        const updatedImage = canvasManager.getCanvasPreview(); 
        res.json({ message: 'Element added.', image: updatedImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to draw element.' });
    }
}