// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import HomePage from './pages/HomePage';

const App = () => {
    const [canvasConfig, setCanvasConfig] = useState(null); 
    
    const handleCanvasInit = (config) => {
        setCanvasConfig(config);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage onInitSuccess={handleCanvasInit} />} />
                <Route 
                    path="/editor" 
                    element={<EditorPage config={canvasConfig} /> }
                />
            </Routes>
        </Router>
    );
};

export default App;