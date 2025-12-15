import React, { useState } from 'react';

const CanvasInitModal = ({ onClose, onCreate }) => {
    const [designName, setDesignName] = useState('');
    const [width, setWidth] = useState(800); 
    const [height, setHeight] = useState(600);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (width <= 0 || height <= 0 || !designName.trim()) {
            setError('Please enter a valid design name, width, and height.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            onCreate(designName, width, height);
            onClose();

        } catch (err) {
            console.error('Initialization Error:', err);
            setError(`Failed to create canvas: ${err.message}. Is the backend running?`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-100 p-4'onClick={onClose}>

            <div className='bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative'
                onClick={(e) => e.stopPropagation()} >

                <button onClick={onClose} className='absolute top-3 right-5 text-gray-500 hover:text-gray-800 text-3xl font-light leading-none cursor-pointer transition-colors'>
                    &times;
                </button>
            
                <h2 className='text-2xl font-semibold mb-6 text-gray-700'>
                    Initialize Canvas
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="design-name" className='block text-sm font-medium text-gray-700 mb-1'>
                            Design Name:
                        </label>
                        <input type="text" id="design-name" value={designName} onChange={(e) => setDesignName(e.target.value)} required disabled={isLoading}className='w-full p-2 border-2 border-gray-300 rounded-md outline-none focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:text-gray-500'/>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="width" className='block text-sm font-medium text-gray-700 mb-1'>
                            Width (px):
                        </label>
                        <input type="number" id="width" value={width} onChange = {(e) => setWidth(parseInt(e.target.value) || 0)} require disabled={isLoading}
                        className='w-full p-2 border border-gray-300 rounded-md outline-0 focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:text-gray-500'/>
                    </div>

                    <div className='mb-6'>
                        <label htmlFor="height" className='block text-sm font-medium text-gray-700 mb-1'>
                            Height (px):
                        </label>
                        <input type="number" id="height" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)} requireddisabled={isLoading} className='w-full p-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:text-gray-500'/>
                    </div>

                    {error && <p className='text-red-500 mb-4 p-2 bg-red-50 rounded-md border border-red-200'>{error}</p>}

                    <button type="submit" disabled={isLoading} className='w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition duration-150 ease-in-out disabled:bg-violet-400 disabled:cursor-not-allowed'>
                        {isLoading ? 'Creating...' : 'Create Canvas'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CanvasInitModal;