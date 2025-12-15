import { createCanvas, loadImage as canvasLoadImage } from 'canvas';
import PDFDocument from 'pdfkit';

class CanvasManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.elements = []; 
        this.width = 0;
        this.height = 0;
    }

    initialize(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.elements = []; 
        this.redrawAll(); 
    }
    
    clearCanvas() {
        if (!this.ctx) return;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }


    async redrawAll() { 
        this.clearCanvas();
        for (const data of this.elements) {
            if (data.type === 'circle') {
                this.drawCircle(data);
            } else if (data.type === 'rectangle') {
                this.drawRectangle(data);
            } else if (data.type === 'text') {
                this.drawText(data);
            } else if (data.type === 'image') {
                await this.drawImage(data); 
            }
        }
    }

    async addElement(data) {
        data.id = Date.now().toString() + Math.random().toString().slice(2, 6); 
        this.elements.push(data);
        await this.redrawAll(); 
        return data.id; 
    }

    drawCircle({ x, y, radius, color }) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawRectangle({ x, y, width, height, color }) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height); 
    }
    
    drawText({ x, y, content, size, font = 'Arial', color }) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px ${font}`; 
        this.ctx.textAlign = 'left'; 
        this.ctx.textBaseline = 'top'; 
        this.ctx.fillText(content, x, y); 
    }
    
    async drawImage({ x, y, width, height, dataUrl }) { 
        if (!dataUrl) {
            console.error('Image data URL is missing.');
            return;
        }

        try {
            const image = await canvasLoadImage(dataUrl); 
            console.log(image) 
            this.ctx.drawImage(image, x, y, width, height);
            
        } catch (error) {
            console.error('Failed to load or draw image from Base64 data:', error);
            console.log("i coming from image")
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fillRect(x, y, width, height);
            this.ctx.fillStyle = 'red';
            this.ctx.font = '12px Arial';
            this.ctx.fillText('Data Error', x + 5, y + 15);
        }
    }
    
    getCanvasPreview() {
        if (!this.canvas) return '';
        return this.canvas.toBuffer('image/jpeg', { quality: 0.8 }).toString('base64');
    }

    

    exportToPDF(res) {
        if (!this.canvas) {
            res.status(400).send('Canvas not initialized.');
            return;
        }
        
        const doc = new PDFDocument({ 
            size: [this.width, this.height], 
            autoFirstPage: false 
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="canvas_design.pdf"');
        doc.pipe(res); 

        doc.addPage();
        const imageBuffer = this.canvas.toBuffer('image/jpeg', { quality: 0.9 });
        doc.image(imageBuffer, 0, 0, { width: this.width, height: this.height });
        doc.end();
    }
}

export default new CanvasManager();