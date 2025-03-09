
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingInspectForm = ({ onComplete }) => {
  // State for questions
  const [inspectionReason, setInspectionReason] = useState("");
  const [inspectionReasonOther, setInspectionReasonOther] = useState("");
  const [roofType, setRoofType] = useState("");
  const [roofAge, setRoofAge] = useState("");
  const [leakConcern, setLeakConcern] = useState("");
  const [certificationNeeded, setCertificationNeeded] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const reasonOptions = [
    "General maintenance inspection",
    "Pre-purchase home inspection",
    "Insurance requirement",
    "Suspected damage/leak",
    "Solar panel installation preparation",
    "Roof warranty validation",
    "Other"
  ];
  
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
  
  const ageOptions = [
    "Less than 5 years",
    "5-10 years",
    "10-20 years",
    "More than 20 years",
    "I'm not sure"
  ];
  
  const yesNoOptions = [
    "Yes",
    "No",
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
    const totalQuestions = 7;
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType: "Inspect a roof",
      inspectionReason,
      inspectionReasonOther,
      roofType,
      roofAge,
      leakConcern,
      certificationNeeded,
      squareFootage,
      stories
    };
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Roof Inspection Project</h2>
      
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
          question="What's the primary reason for the roof inspection?"
          options={reasonOptions}
          value={inspectionReason}
          onChange={(e) => {
            setInspectionReason(e.target.value);
            setCurrentQuestion(2);
          }}
          showTextbox={true}
          textboxValue={inspectionReasonOther}
          onTextboxChange={(e) => setInspectionReasonOther(e.target.value)}
          isVisible={showQuestion(1)}
        />
        
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
          question="How old is your roof?"
          options={ageOptions}
          value={roofAge}
          onChange={(e) => {
            setRoofAge(e.target.value);
            setCurrentQuestion(4);
          }}
          isVisible={showQuestion(3)}
        />
        
        <FormQuestion
          question="Are you concerned about potential leaks or damage?"
          options={yesNoOptions}
          value={leakConcern}
          onChange={(e) => {
            setLeakConcern(e.target.value);
            setCurrentQuestion(5);
          }}
          isVisible={showQuestion(4)}
        />
        
        <FormQuestion
          question="Do you need a certified inspection report?"
          options={yesNoOptions}
          value={certificationNeeded}
          onChange={(e) => {
            setCertificationNeeded(e.target.value);
            setCurrentQuestion(6);
          }}
          isVisible={showQuestion(5)}
        />
        
        <FormQuestion
          question="What's the approximate square footage of your home?"
          options={squareFootageOptions}
          value={squareFootage}
          onChange={(e) => {
            setSquareFootage(e.target.value);
            setCurrentQuestion(7);
          }}
          isVisible={showQuestion(6)}
        />
        
        <FormQuestion
          question="How many stories tall is your home?"
          options={storyOptions}
          value={stories}
          onChange={(e) => {
            setStories(e.target.value);
            setCurrentQuestion(8);
          }}
          isVisible={showQuestion(7)}
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

export default RoofingInspectForm;
