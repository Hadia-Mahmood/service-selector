
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingSkylightsForm = ({ onComplete }) => {
  // State for questions
  const [skylightProject, setSkylightProject] = useState("");
  const [skylightType, setSkylightType] = useState("");
  const [skylightCount, setSkylightCount] = useState("");
  const [openingType, setOpeningType] = useState("");
  const [skylightBrand, setSkylightBrand] = useState("");
  const [skylightBrandOther, setSkylightBrandOther] = useState("");
  const [leakingIssue, setLeakingIssue] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const projectTypes = [
    "Install new skylight(s)",
    "Replace existing skylight(s)",
    "Repair skylight leak",
    "Clean skylight(s)",
    "Other maintenance"
  ];
  
  const skylightTypes = [
    "Fixed (non-opening)",
    "Vented (opens and closes)",
    "Tubular/Sun tunnel",
    "Custom design",
    "I'm not sure"
  ];
  
  const countOptions = [
    "1",
    "2",
    "3",
    "4",
    "5+",
    "I'm not sure yet"
  ];
  
  const openingOptions = [
    "Manual (hand crank)",
    "Electric/Motorized",
    "Solar-powered",
    "I'm not sure",
    "Not applicable (fixed skylight)"
  ];
  
  const brandOptions = [
    "VELUX",
    "Fakro",
    "Andersen",
    "CrystaLite",
    "Wasco",
    "ODL",
    "I don't know",
    "Other"
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
      projectType: "Install, repair or maintain skylights",
      skylightProject,
      skylightType,
      skylightCount,
      openingType,
      skylightBrand,
      skylightBrandOther,
      leakingIssue,
      squareFootage,
      stories
    };
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Skylight Project</h2>
      
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
          question="What type of skylight project do you need?"
          options={projectTypes}
          value={skylightProject}
          onChange={(e) => {
            setSkylightProject(e.target.value);
            setCurrentQuestion(2);
          }}
          isVisible={showQuestion(1)}
        />
        
        {(skylightProject === "Install new skylight(s)" || skylightProject === "Replace existing skylight(s)") && (
          <FormQuestion
            question="What type of skylight are you interested in?"
            options={skylightTypes}
            value={skylightType}
            onChange={(e) => {
              setSkylightType(e.target.value);
              setCurrentQuestion(3);
            }}
            isVisible={showQuestion(2)}
          />
        )}
        
        <FormQuestion
          question="How many skylights are involved in this project?"
          options={countOptions}
          value={skylightCount}
          onChange={(e) => {
            setSkylightCount(e.target.value);
            setCurrentQuestion(skylightProject === "Install new skylight(s)" || skylightProject === "Replace existing skylight(s)" ? 4 : 3);
          }}
          isVisible={skylightProject === "Install new skylight(s)" || skylightProject === "Replace existing skylight(s)" ? showQuestion(3) : showQuestion(2)}
        />
        
        {skylightType === "Vented (opens and closes)" && (
          <FormQuestion
            question="What type of opening mechanism do you prefer?"
            options={openingOptions}
            value={openingType}
            onChange={(e) => {
              setOpeningType(e.target.value);
              setCurrentQuestion(5);
            }}
            isVisible={showQuestion(4)}
          />
        )}
        
        {skylightProject === "Replace existing skylight(s)" || skylightProject === "Repair skylight leak" && (
          <FormQuestion
            question="What brand is your existing skylight?"
            options={brandOptions}
            value={skylightBrand}
            onChange={(e) => {
              setSkylightBrand(e.target.value);
              setCurrentQuestion(skylightType === "Vented (opens and closes)" ? 6 : 5);
            }}
            showTextbox={true}
            textboxValue={skylightBrandOther}
            onTextboxChange={(e) => setSkylightBrandOther(e.target.value)}
            isVisible={skylightType === "Vented (opens and closes)" ? showQuestion(5) : showQuestion(4)}
          />
        )}
        
        {skylightProject === "Repair skylight leak" && (
          <FormQuestion
            question="Is the skylight actively leaking now?"
            options={yesNoOptions}
            value={leakingIssue}
            onChange={(e) => {
              setLeakingIssue(e.target.value);
              setCurrentQuestion(skylightType === "Vented (opens and closes)" ? 7 : 6);
            }}
            isVisible={skylightType === "Vented (opens and closes)" ? showQuestion(6) : showQuestion(5)}
          />
        )}
        
        <FormQuestion
          question="What's the approximate square footage of your home?"
          options={squareFootageOptions}
          value={squareFootage}
          onChange={(e) => {
            setSquareFootage(e.target.value);
            setCurrentQuestion(8);
          }}
          isVisible={showQuestion(7)}
        />
        
        <FormQuestion
          question="How many stories tall is your home?"
          options={storyOptions}
          value={stories}
          onChange={(e) => {
            setStories(e.target.value);
            setCurrentQuestion(9);
          }}
          isVisible={showQuestion(8)}
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

export default RoofingSkylightsForm;
