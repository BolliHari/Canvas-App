// frontend/src/api.js

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/canvas`;

// 1. Initial Call: Initializes the canvas on the Node.js backend
export const initCanvas = async (designName, width, height) => {
    const response = await fetch(`${API_BASE_URL}/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ designName, width, height })
    });
    
    if (!response.ok) {
        throw new Error('Failed to initialize canvas on server.');
    }
    return response.json(); // Should return success message/initial preview
};

// 2. Add Element Call: Adds element and gets the updated preview
export const addElement = async (elementData) => {
    console.log(elementData)
    const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elementData)
    });

    const result = await response.json();
    if (!response.ok || !result.image) {
        throw new Error(result.message || 'Failed to draw element.');
    }
    // Returns the Base64 image data
    return result.image; 
};

// 3. PDF Export Call: Triggers the download (handled via browser redirect)
// export const exportPdf = () => { ... } // Not needed as it's a redirect/window.location