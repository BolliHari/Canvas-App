import React, { useState } from 'react';

const ElementForm = ({ onAddElement, disabled }) => {
    const [elementType, setElementType] = useState('circle'); 
    const [inputs, setInputs] = useState({
        x: 50, 
        y: 50, 
        color: '#000000',
        width: 150, 
        height: 150, 
        radius: 50,
        content: 'New Text', 
        size: 30, font: 'Arial',
    });
    const [imageData, setImageData] = useState(null); 
    const [isProcessingImage, setIsProcessingImage] = useState(false);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsProcessingImage(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.8); 
        
                setImageData(jpegDataUrl); 
                setIsProcessingImage(false);
                console.log("File converted to JPEG Base64 and loaded successfully.");

            };
            img.onerror = (error) => {
                console.error("Error loading image for conversion:", error);
                setIsProcessingImage(false);
                alert("Error: Image failed to load for conversion.");
            };
            img.src = e.target.result;
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
            setIsProcessingImage(false);
            alert("Failed to read image file.");
        };
        reader.readAsDataURL(file); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let elementData = {
            type: elementType,
            x: parseInt(inputs.x),
            y: parseInt(inputs.y),
        };
    
        elementData.id = Date.now().toString() + Math.random().toString().slice(2, 6);

        if (elementType === 'circle') {
            elementData = { ...elementData, radius: parseInt(inputs.radius), color: inputs.color };
        } else if (elementType === 'rectangle') {
            elementData = { ...elementData, width: parseInt(inputs.width), height: parseInt(inputs.height), color: inputs.color };
        } else if (elementType === 'text') {
            elementData = { ...elementData, content: inputs.content, size: parseInt(inputs.size), font: inputs.font, color: inputs.color };
        } else if (elementType === 'image') {
            if (!imageData) {
                alert("Please select an image file first.");
                return;
            }
            elementData = { 
                ...elementData, 
                width: parseInt(inputs.width), 
                height: parseInt(inputs.height), 
                dataUrl: imageData 
            };
        }
        
        onAddElement(elementData);
        if (elementType === 'image') {
            setImageData(null);
        }
    };
    
    const renderTypeInputs = () => {
        const inputClasses = 'w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:text-gray-500';
        const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';
    
        const commonInputs = (
            <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                    <label htmlFor="x" className={labelClasses}>X Position:</label>
                    <input type="number" id="x" value={inputs.x} onChange={handleChange} placeholder="0" required disabled={disabled} className={inputClasses}/>
                </div>
                <div>
                    <label htmlFor="y" className={labelClasses}>Y Position:</label>
                    <input type="number" id="y" value={inputs.y} onChange={handleChange} placeholder="0" required disabled={disabled} className={inputClasses}/>
                </div>
            </div>
        );

        if (elementType === 'circle') {
            return (
                <>
                    {commonInputs}
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div>
                            <label htmlFor="radius" className={labelClasses}>Radius:</label>
                            <input type="number" id="radius" value={inputs.radius} onChange={handleChange} placeholder="50" required isabled={disabled} className={inputClasses}/>
                        </div>
                        <div>
                            <label htmlFor="color" className={labelClasses}>Color:</label>
                            <input type="color" id="color"value={inputs.color} onChange={handleChange} disabled={disabled} className='w-full h-10 border border-gray-300 rounded-md cursor-pointer'/>
                        </div>
                    </div>
                </>
            );
        } 
        
        if (elementType === 'rectangle') {
            return (
                <>
                    {commonInputs}
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div>
                            <label htmlFor="width" className={labelClasses}>Width:</label>
                            <input type="number" id="width" value={inputs.width} onChange={handleChange} placeholder="100" required disabled={disabled} className={inputClasses}/>
                        </div>
                        <div>
                            <label htmlFor="height" className={labelClasses}>Height:</label>
                            <input type="number" id="height" value={inputs.height} onChange={handleChange} placeholder="50" required disabled={disabled} className={inputClasses}/>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="color" className={labelClasses}>Color:</label>
                        <input type="color" value={inputs.color} onChange={handleChange} disabled={disabled} className='w-full h-10 border border-gray-300 rounded-md cursor-pointer'/>
                    </div>
                </>
            );
        } 
        
        if (elementType === 'text') {
            return (
                <>
                    {commonInputs}
                    <div className='mb-4'>
                        <label htmlFor="content" className={labelClasses}>Text Content:</label>
                        <input type="text" id="content" value={inputs.content} onChange={handleChange} placeholder="Hello Canvas" required disabled={disabled} className={inputClasses}/>
                    </div>
                    
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div>
                            <label htmlFor="size" className={labelClasses}>Font Size (px):</label>
                            <input type="number" id="size" value={inputs.size} onChange={handleChange} placeholder="16" required disabled={disabled} className={inputClasses}/>
                        </div>
                        <div>
                            <label htmlFor="color" className={labelClasses}>Color:</label>
                            <input type="color" id="color" value={inputs.color} onChange={handleChange} disabled={disabled} className='w-full h-10 border border-gray-300 rounded-md cursor-pointer'/>
                        </div>
                    </div>
                </>
            );
        } 
    
    if (elementType === 'image') {
        return (
            <>
                {commonInputs}
                <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div>
                        <label htmlFor="width" className={labelClasses}>Width:</label>
                        <input type="number" id="width" value={inputs.width} onChange={handleChange} placeholder="100" required disabled={disabled} className={inputClasses}/>
                    </div>
                    <div>
                        <label htmlFor="height" className={labelClasses}>Height:</label>
                        <input type="number" id="height" value={inputs.height} onChange={handleChange} placeholder="100" required disabled={disabled} className={inputClasses}/>
                    </div>
                </div>

                {/* File Input and Status Messages */}
                <div className='mb-4'>
                    <label htmlFor="image-file" className={labelClasses}>Select Image File:</label>
                    <input type="file" id="image-file" accept="image/*" onChange={handleImageChange} disabled={disabled || isProcessingImage} required className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 disabled:opacity-50'/>
                </div>

                {isProcessingImage && (
                    <p className='text-blue-600 text-sm p-2 bg-blue-50 border border-blue-200 rounded-md'>
                        Processing file...
                    </p>
                )}
                {imageData && !isProcessingImage && (
                    <p className='text-emerald-600 text-sm p-2 bg-emerald-50 border border-emerald-200 rounded-md'>
                        File loaded: Ready to Add
                    </p>
                )}
            </>
        );
    }
    
    return null;
};

    return (
        <div className='p-4 border border-gray-200 rounded-lg shadow-sm bg-white'>
            <form onSubmit={handleSubmit} className='grid gap-4'>
                <div>
                    <label htmlFor="element-type" className='block text-sm font-medium text-gray-700 mb-1'>
                        Select Element Type:
                    </label>
                    <select id="element-type" value={elementType} onChange={(e) => setElementType(e.target.value)} disabled={disabled}className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:text-gray-500'
                    >
                        <option value="circle">Circle</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="text">Text</option>
                        <option value="image">Image (from local file)</option>
                    </select>
                </div>
                
                {renderTypeInputs()}
                
                <button type="submit" disabled={disabled || (elementType === 'image' && !imageData) || isProcessingImage} className={`mt-2 py-2 px-4 rounded-md font-semibold text-white transition duration-150 ease-in-out shadow-md ${disabled || (elementType === 'image' && !imageData) || isProcessingImage? 'bg-violet-400 cursor-not-allowed': 'bg-violet-600 hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50'}`}>
                    ADD
                </button>
            </form>
        </div>
    );
};

export default ElementForm;