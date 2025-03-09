
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingRepairForm = ({ onComplete }) => {
  // State for questions
  const [roofType, setRoofType] = useState("");
  const [problemType, setProblemType] = useState("");
  const [problemOther, setProblemOther] = useState("");
  const [roofAge, setRoofAge] = useState("");
  const [leakingDuration, setLeakingDuration] = useState("");
  const [insulationDamage, setInsulationDamage] = useState("");
  const [emergencyRepair, setEmergencyRepair] = useState("");
  const [insuranceClaim, setInsuranceClaim] = useState("");
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
  
  const problemTypes = [
    "Leaking",
    "Missing/damaged shingles or materials", 
    "Wind damage",
    "Storm damage",
    "Skylight leaking",
    "Chimney flashing",
    "Valley issues",
    "Ice dams",
    "Other"
  ];
  
  const ageOptions = [
    "Less than 5 years",
    "5-10 years",
    "10-20 years",
    "More than 20 years",
    "I'm not sure"
  ];
  
  const durationOptions = [
    "Just noticed",
    "Few days",
    "Few weeks", 
    "Few months", 
    "More than 6 months",
    "Not leaking"
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
    const totalQuestions = 8;
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType: "Repair a roof",
      roofType,
      problemType,
      problemOther,
      roofAge,
      leakingDuration,
      insulationDamage,
      emergencyRepair,
      insuranceClaim,
      squareFootage,
      stories
    };
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Roof Repair Project</h2>
      
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
          question="What problem are you experiencing with your roof?"
          options={problemTypes}
          value={problemType}
          onChange={(e) => {
            setProblemType(e.target.value);
            setCurrentQuestion(3);
          }}
          showTextbox={true}
          textboxValue={problemOther}
          onTextboxChange={(e) => setProblemOther(e.target.value)}
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
        
        {problemType === "Leaking" && (
          <FormQuestion
            question="How long has it been leaking?"
            options={durationOptions}
            value={leakingDuration}
            onChange={(e) => {
              setLeakingDuration(e.target.value);
              setCurrentQuestion(5);
            }}
            isVisible={showQuestion(4)}
          />
        )}
        
        <FormQuestion
          question="Is there damage to insulation or interior walls?"
          options={yesNoOptions}
          value={insulationDamage}
          onChange={(e) => {
            setInsulationDamage(e.target.value);
            setCurrentQuestion(problemType === "Leaking" ? 6 : 5);
          }}
          isVisible={problemType === "Leaking" ? showQuestion(5) : showQuestion(4)}
        />
        
        <FormQuestion
          question="Is this an emergency repair (e.g., major leak, structural issue)?"
          options={yesNoOptions}
          value={emergencyRepair}
          onChange={(e) => {
            setEmergencyRepair(e.target.value);
            setCurrentQuestion(problemType === "Leaking" ? 7 : 6);
          }}
          isVisible={problemType === "Leaking" ? showQuestion(6) : showQuestion(5)}
        />
        
        <FormQuestion
          question="Are you filing an insurance claim for this repair?"
          options={yesNoOptions}
          value={insuranceClaim}
          onChange={(e) => {
            setInsuranceClaim(e.target.value);
            setCurrentQuestion(problemType === "Leaking" ? 8 : 7);
          }}
          isVisible={problemType === "Leaking" ? showQuestion(7) : showQuestion(6)}
        />
        
        <FormQuestion
          question="What's the approximate square footage of your home?"
          options={squareFootageOptions}
          value={squareFootage}
          onChange={(e) => {
            setSquareFootage(e.target.value);
            setCurrentQuestion(problemType === "Leaking" ? 9 : 8);
          }}
          isVisible={problemType === "Leaking" ? showQuestion(8) : showQuestion(7)}
        />
        
        <FormQuestion
          question="How many stories tall is your home?"
          options={storyOptions}
          value={stories}
          onChange={(e) => {
            setStories(e.target.value);
            setCurrentQuestion(problemType === "Leaking" ? 10 : 9);
          }}
          isVisible={problemType === "Leaking" ? showQuestion(9) : showQuestion(8)}
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

export default RoofingRepairForm;
