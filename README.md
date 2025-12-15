# 🎨 Canvas Editor & Designer (Full-Stack)

This project is a dynamic, full-stack application that allows users to design and manipulate various graphical elements (Circles, Rectangles, Text, and Images) on a canvas, with all rendering performed **server-side**.

## ✨ Key Features

* **Server-Side Rendering (SSR):** All canvas manipulation and drawing are handled by the Node.js backend using the `node-canvas` library, ensuring consistent rendering independent of the client browser.
* **Element Types:** Supports drawing and editing of **Circles, Rectangles, Text, and Images**.
* **Image Handling:** Robust processing of image uploads, including **frontend conversion of all file types (PNG, GIF, JPG) to JPEG** for optimal performance and reliable Base64 transmission.
* **Live Preview:** Real-time preview updates via API calls after every element addition or change.
* **PDF Export:** Functionality to export the final canvas design as a high-quality PDF document.

## 💻 Technical Architecture

| Component | Technology/Library | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | React | User interface, form handling, file reading, API requests. |
| **Backend (API)** | Node.js (Express) | Routing, handling canvas state, serving as the API layer. |
| **Canvas Engine** | `node-canvas` | Drawing shapes, registering fonts, loading images, generating Base64 preview and PDF buffer. |
| **PDF Export** | `pdfkit` | Generating the final PDF document buffer from the canvas image. |

## 🛠️ Setup and Installation

### Prerequisites

* Node.js (v18+)
* npm or yarn

### 1. Backend Setup

1.  Navigate to the `backend` directory.
    ```bash
    cd backend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Start the server.
    ```bash
    npm start  # or node server.js
    ```
    *(The backend will run on `http://localhost:5000`)*

### 2. Frontend Setup

1.  Navigate to the `frontend` directory.
    ```bash
    cd ../frontend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Start the client application.
    ```bash
    npm run dev
    ```
   

## 🛑 Critical Deployment & Architectural Notes

The successful deployment of this project to a serverless environment (Vercel) required solving several complex, environment-specific challenges:

### 1. Serverless Font Registration (Crucial Fix)
* **Problem:** Text rendered as squares (tofu) on the live site because the serverless environment lacked standard system fonts, and traditional installation commands failed.
* **Solution:** A **custom font (`Roboto.ttf`) was manually bundled** within the `backend/fonts` directory and registered with `node-canvas`.
* **Implementation Note:** Required fixing the `ReferenceError: __dirname is not defined` error by using **ES Module (ESM) compatible path utilities** (`import.meta.url`, `path.resolve`) to reliably locate the font file on the server.

### 2. Large Payload Transmission (413 Error Fix)
* **Problem:** Uploading large image files caused a **`413 Payload Too Large`** error, as the Base64 image string exceeded Express's default body limit.
* **Solution:** The Express configuration in `backend/server.js` was explicitly updated to accept JSON payloads up to **50MB**.

### 3. Image Display Stability
* **Problem:** The final Base64 string for the canvas preview was too long for browser display, causing the image preview to fail intermittently.
* **Solution:** The backend's `getCanvasPreview` method was optimized to output the canvas as a **JPEG buffer with 0.8 quality**, drastically reducing the Base64 string size for reliable frontend rendering.