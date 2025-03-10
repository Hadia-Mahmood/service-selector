
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingCleanForm = ({ onComplete }) => {
  // State for questions
  const [roofType, setRoofType] = useState("");
  const [roofTypeOther, setRoofTypeOther] = useState("");
  const [cleaningReason, setCleaningReason] = useState("");
  const [cleaningReasonOther, setCleaningReasonOther] = useState("");
  const [lastCleaned, setLastCleaned] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofTypes = [
    "Asphalt or composite shingle", 
    "Wood shingle or shake", 
    "Tile", 
    "Metal", 
    "Single ply or rubber membrane", 
    "Built-up tar or gravel", 
    "I'm not sure",
    "Other"
  ];
  
  const cleaningReasons = [
    "Moss removal",
    "Mold, fungus or mildew removal",
    "Stain and discoloration removal",
    "Preventative maintenance",
    "Dirt and debris removal",
    "Other"
  ];
  
  const lastCleanedOptions = [
    "Less than 1 year ago",
    "1-2 years ago",
    "More than 2 years ago",
    "Never",
    "I'm not sure"
  ];
  
  const storyOptions = [
    "One floor",
    "Two floors",
    "Three or more floors"
  ];

  // Determine which question to show
  const showQuestion = (questionNumber) => {
    return currentQuestion >= questionNumber;
  };

  // Calculate the form progress
  useEffect(() => {
    const totalQuestions = 4;
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType: "Clean a roof",
      roofType,
      roofTypeOther,
      cleaningReason,
      cleaningReasonOther,
      lastCleaned,
      stories
    };
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Roof Cleaning Project</h2>
      
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${formProgress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {Math.round(formProgress)}% complete
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormQuestion
          question="What kind of roof do you have?"
          options={roofTypes}
          value={roofType}
          onChange={(e) => {
            setRoofType(e.target.value);
            setCurrentQuestion(2);
          }}
          showTextbox={roofType === "Other"}
          textboxValue={roofTypeOther}
          onTextboxChange={(e) => setRoofTypeOther(e.target.value)}
          isVisible={showQuestion(1)}
        />
        
        <FormQuestion
          question="Why does the roof need cleaning? Select all that apply."
          options={cleaningReasons}
          value={cleaningReason}
          onChange={(e) => {
            setCleaningReason(e.target.value);
            setCurrentQuestion(3);
          }}
          showTextbox={cleaningReason === "Other"}
          textboxValue={cleaningReasonOther}
          onTextboxChange={(e) => setCleaningReasonOther(e.target.value)}
          isVisible={showQuestion(2)}
        />
        
        <FormQuestion
          question="Approximately when was the roof last cleaned?"
          options={lastCleanedOptions}
          value={lastCleaned}
          onChange={(e) => {
            setLastCleaned(e.target.value);
            setCurrentQuestion(4);
          }}
          isVisible={showQuestion(3)}
        />
        
        <FormQuestion
          question="How many stories tall is your home?"
          options={storyOptions}
          value={stories}
          onChange={(e) => {
            setStories(e.target.value);
            setCurrentQuestion(5);
          }}
          isVisible={showQuestion(4)}
        />

        {/* Submit Button */}
        {stories && (
          <div className="pt-6 animate-fade-in">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Find Pros
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RoofingCleanForm;
