import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addElement } from '../api'; 
import ElementForm from '../components/ElementForm'; 
import CanvasPreview from '../components/CanvasPreview';

const EditorPage = ({ config }) => {
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const canvasWidth = config?.width;
    const canvasHeight = config?.height;

    useEffect(() => {
        if (!config || !config.designName) {
            navigate('/', { replace: true });
        }
    }, [config]);

    const handleAddElement = async (elementData) => {
        setLoading(true);
        try {
            const newImageBase64 = await addElement(elementData);
            setPreviewImage(newImageBase64);    
        } catch (error) {
            console.error('Error adding element:', error.message);
            alert(`Error: Could not add element. Ensure the backend is running.`);
        } finally {
            setLoading(false);
        }
    };
    
    const handleExportPdf = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        console.log(backendUrl)
        const BACKEND_URL_PDF =  `${backendUrl}/export/pdf`;
        window.location.href = BACKEND_URL_PDF;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="flex items-center justify-between p-4 shadow-md bg-blue-500 text-white sticky top-0 z-10">
                <h1 className='text-xl font-bold'>
                    Canvas
                </h1>
                
                <button onClick={handleExportPdf} disabled={loading} className={`py-2 px-4 rounded-md font-semibold transition duration-150 ${loading ? 'bg-gray-400 text-gray-700 cursor-not-allowed': 'bg-violet-500 hover:bg-violet-600 text-white shadow-md'}`}>
                    {loading ? 'Processing...' : 'Export as PDF'}
                </button>
            </nav>

            <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* left */}
                <div className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-lg">
                    <h2 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
                        Add Elements
                    </h2>

                    <ElementForm onAddElement={handleAddElement} disabled={loading} />

                    {loading && (
                        <p className='mt-4 p-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded'>
                            Processing element on server...
                        </p>
                    )}
                </div>

                {/* right */}
                <div className="w-full md:w-3/4 p-4 rounded-lg shadow-lg bg-gray-100">
                    <h2 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
                        Live Preview
                    </h2>
                    
                    <CanvasPreview base64Image={previewImage} width={canvasWidth} height={canvasHeight}/>
                    
                    <p className='mt-4 text-sm text-gray-500'>
                        Dimensions: {config?.width}px x ${config?.height}px
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;