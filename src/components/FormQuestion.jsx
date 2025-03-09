
import React, { useState, useEffect } from 'react';

const FormQuestion = ({ 
  question, 
  options, 
  onChange, 
  value, 
  showTextbox = false, 
  isVisible = true, 
  textboxValue = "", 
  onTextboxChange = () => {},
  textboxLabel = "Please explain"
}) => {
  const [isRendered, setIsRendered] = useState(false);
  
  useEffect(() => {
    // Add a small delay for the animation to work properly
    const timer = setTimeout(() => {
      setIsRendered(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;
  
  return (
    <div className={`w-full mb-8 ${isRendered ? 'entered' : 'entering'}`}>
      {/* Question Label */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
          Question
        </label>
      </div>
      
      {/* Question Text */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{question}</h3>
      
      {/* Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select an Option</label>
        <select
          value={value || ""}
          onChange={onChange}
          className="select select-bordered w-full mt-1"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Textbox for "Other" Option */}
      {showTextbox && value === "Other" && (
        <div className="mb-4 animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {textboxLabel}
          </label>
          <textarea
            value={textboxValue}
            onChange={onTextboxChange}
            className="input input-bordered w-full mt-1 mb-2"
            rows={3}
            placeholder="Please provide more details..."
          />
        </div>
      )}
    </div>
  );
};

export default FormQuestion;
