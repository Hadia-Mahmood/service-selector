
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingOtherForm = ({ onComplete }) => {
  // State for questions
  const [projectDescription, setProjectDescription] = useState("");
  const [roofType, setRoofType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [specialRequirementsDetails, setSpecialRequirementsDetails] = useState("");
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
  
  const urgencyOptions = [
    "Emergency - need help immediately",
    "Urgent - within days",
    "Standard - within weeks",
    "Planning ahead - flexible timeline"
  ];
  
  const specialRequirementsOptions = [
    "Historic property",
    "HOA restrictions",
    "Energy efficiency improvements",
    "Specific material requirements",
    "Accessibility challenges",
    "None",
    "Other"
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
      projectType: "Other roofing project",
      projectDescription,
      roofType,
      urgency,
      specialRequirements,
      specialRequirementsDetails,
      squareFootage,
      stories
    };
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Roofing Project</h2>
      
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
        {/* Custom description field */}
        <div className={`w-full mb-8 ${currentQuestion >= 1 ? 'entered' : 'entering'}`}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
              Question
            </label>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Please describe your roofing project</h3>
          <textarea
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value);
              if (e.target.value.length > 10) {
                setCurrentQuestion(2);
              }
            }}
            className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Describe what you need help with..."
          />
        </div>
        
        <FormQuestion
          question="What type of roof do you have?"
          options={roofTypes}
          value={roofType}
          onChange={(e) => {
            setRoofType(e.target.value);
            setCurrentQuestion(3);
          }}
          isVisible={showQuestion(2)}
        />
        
        <FormQuestion
          question="How urgent is this project?"
          options={urgencyOptions}
          value={urgency}
          onChange={(e) => {
            setUrgency(e.target.value);
            setCurrentQuestion(4);
          }}
          isVisible={showQuestion(3)}
        />
        
        <FormQuestion
          question="Are there any special requirements for this project?"
          options={specialRequirementsOptions}
          value={specialRequirements}
          onChange={(e) => {
            setSpecialRequirements(e.target.value);
            setCurrentQuestion(5);
          }}
          showTextbox={true}
          textboxValue={specialRequirementsDetails}
          onTextboxChange={(e) => setSpecialRequirementsDetails(e.target.value)}
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

export default RoofingOtherForm;
