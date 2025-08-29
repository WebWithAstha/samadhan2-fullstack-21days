import React, { useState } from 'react';
import './TextPreview.css';

const TextPreview = () => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleBgColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  return (
    <div className="text-preview-container">
      <h2>Live Text Preview</h2>
      
      <div className="controls">
        <div className="control-group">
          <label>Text Input:</label>
          <textarea 
            value={text} 
            onChange={handleTextChange}
            placeholder="Type something here..."
            rows="4"
          />
        </div>
        
        <div className="control-group">
          <label>Font Size: {fontSize}px</label>
          <input 
            type="range" 
            min="10" 
            max="40" 
            value={fontSize} 
            onChange={handleFontSizeChange}
          />
        </div>
        
        <div className="control-group">
          <label>Text Color:</label>
          <input 
            type="color" 
            value={textColor} 
            onChange={handleTextColorChange}
          />
        </div>
        
        <div className="control-group">
          <label>Background Color:</label>
          <input 
            type="color" 
            value={backgroundColor} 
            onChange={handleBgColorChange}
          />
        </div>
      </div>
      
      <div 
        className="preview"
        style={{ 
          fontSize: `${fontSize}px`,
          color: textColor,
          backgroundColor: backgroundColor
        }}
      >
        {text || 'Your text will appear here...'}
      </div>
    </div>
  );
};

export default TextPreview;
