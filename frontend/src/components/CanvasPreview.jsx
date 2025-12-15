import React from 'react';

const CanvasPreview = ({ base64Image, width, height }) => {

    const imageSrc = base64Image ? `data:image/jpeg;base64,${base64Image}` : "";

    return (
        <img id="canvas-preview" src={imageSrc} alt="Live Canvas Preview" width={width}height={height} className="border-2 border-gray-500 max-w-full h-auto shadow-md outline-0 rounded-lg p-2"/>
    );
};

export default CanvasPreview;