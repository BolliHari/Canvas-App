import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initCanvas } from '../api'; 
import CanvasInitModal from '../components/CanvasInitModal'; 

const HomePage = ({ onInitSuccess }) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreateCanvas = async (name, width, height) => {
        try {
            await initCanvas(name, width, height); 
        
            onInitSuccess({ designName: name, width, height });
            navigate('/editor');

        } catch (error) {
            console.error(error.message);
            alert("Error setting up canvas: " + error.message);
        }
    };

    return (
        <div className='relative h-screen flex items-center justify-center'>
            <img 
                src="../public/background.png" 
                alt="bg-image" 
                className='absolute h-full w-full object-cover -z-10 opacity-50'
            />
            
            <div className="p-8 bg-white shadow-2xl rounded-xl transition-all duration-300 hover:shadow-3xl border border-violet-400">
                <h1 className='text-center font-bold text-2xl mb-5 text-gray-800'>
                    Canvas Builder
                </h1>
                
                <button className='p-3 px-8 rounded-lg cursor-pointer bg-violet-600 text-white font-semibold transition duration-200 ease-in-out hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50'onClick={() => setIsModalOpen(true)}>
                    Create New Canvas
                </button>
            </div>
            
            {isModalOpen && (
                <CanvasInitModal 
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateCanvas} 
                />
            )}
        </div>
    );
};



export default HomePage;