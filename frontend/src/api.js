
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/canvas`;


export const initCanvas = async (designName, width, height) => {
    const response = await fetch(`${API_BASE_URL}/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ designName, width, height })
    });
    
    if (!response.ok) {
        throw new Error('Failed to initialize canvas on server.');
    }
    return response.json(); 


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
    
    return result.image; 
};

