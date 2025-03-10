
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingCleanForm = ({ onComplete }) => {
  // State for questions
  const [roofType, setRoofType] = useState("");
  const [cleaningReason, setCleaningReason] = useState("");
  const [cleaningReasonOther, setCleaningReasonOther] = useState("");
  const [lastCleaned, setLastCleaned] = useState("");
  const [mossGrowth, setMossGrowth] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofTypes = [
    "Asphalt shingles", 
    "Metal", 
    "Tile", 
    "Flat/Built-up", 
    "Slate", 
    "Wood shingles/shakes", 
    "I'm not sure",
    "Other"
  ];
  
  const cleaningReasons = [
    "Moss or algae removal",
    "General cleaning/maintenance",
    "Preparing for coating or treatment",
    "Preparing to sell the home",
    "Visible stains/discoloration",
    "Gutter cleaning included",
    "Other"
  ];
  
  const lastCleanedOptions = [
    "Never been cleaned",
    "Within the last year",
    "1-3 years ago",
    "3-5 years ago",
    "More than 5 years ago",
    "I'm not sure"
  ];
  
  const mossOptions = [
    "Severe (covering large areas)",
    "Moderate (visible patches)",
    "Light (just beginning to grow)",
    "None",
    "I'm not sure"
  ];
  
  const squareFootageOptions = [
    "Under 1000 sq ft",
    "1000-2000 sq ft",
    "2000-3000 sq ft",
    "Over 3000 sq ft",
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
    const totalQuestions = 6;
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType: "Clean a roof",
      roofType,
      cleaningReason,
      cleaningReasonOther,
      lastCleaned,
      mossGrowth,
      squareFootage,
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
          question="What type of roof do you have?"
          options={roofTypes}
          value={roofType}
          onChange={(e) => {
            setRoofType(e.target.value);
            setCurrentQuestion(2);
          }}
          isVisible={showQuestion(1)}
        />
        
        <FormQuestion
          question="Why are you looking to clean your roof?"
          options={cleaningReasons}
          value={cleaningReason}
          onChange={(e) => {
            setCleaningReason(e.target.value);
            setCurrentQuestion(3);
          }}
          showTextbox={true}
          textboxValue={cleaningReasonOther}
          onTextboxChange={(e) => setCleaningReasonOther(e.target.value)}
          isVisible={showQuestion(2)}
        />
        
        <FormQuestion
          question="When was the last time your roof was professionally cleaned?"
          options={lastCleanedOptions}
          value={lastCleaned}
          onChange={(e) => {
            setLastCleaned(e.target.value);
            setCurrentQuestion(4);
          }}
          isVisible={showQuestion(3)}
        />
        
        <FormQuestion
          question="Is there moss or algae growth on the roof?"
          options={mossOptions}
          value={mossGrowth}
          onChange={(e) => {
            setMossGrowth(e.target.value);
            setCurrentQuestion(5);
          }}
          isVisible={showQuestion(4)}
        />
        
        <FormQuestion
          question="What's the approximate square footage of your home?"
          options={squareFootageOptions}
          value={squareFootage}
          onChange={(e) => {
            setSquareFootage(e.target.value);
            setCurrentQuestion(6);
          }}
          isVisible={showQuestion(5)}
        />
        
        <FormQuestion
          question="How many stories tall is your home?"
          options={storyOptions}
          value={stories}
          onChange={(e) => {
            setStories(e.target.value);
            setCurrentQuestion(7);
          }}
          isVisible={showQuestion(6)}
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
