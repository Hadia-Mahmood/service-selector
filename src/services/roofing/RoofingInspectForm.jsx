
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingInspectForm = ({ onComplete }) => {
  // State for questions
  const [roofSlope, setRoofSlope] = useState("");
  const [flatRoofType, setFlatRoofType] = useState("");
  const [flatRoofOther, setFlatRoofOther] = useState("");
  const [slopedRoofType, setSlopedRoofType] = useState("");
  const [slopedRoofOther, setSlopedRoofOther] = useState("");
  const [inspectionReason, setInspectionReason] = useState("");
  const [inspectionReasonOther, setInspectionReasonOther] = useState("");
  const [previousDamage, setPreviousDamage] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofSlopeOptions = [
    "Sloped or pitched", 
    "Flat"
  ];
  
  const flatRoofOptions = [
    "I'm not sure",
    "PVC single-ply membrane",
    "TPO single-ply membrane",
    "Torch down modified bitumen",
    "EPDM rubber membrane",
    "Silicone spray",
    "Built-up tar and gravel",
    "Other"
  ];
  
  const slopedRoofOptions = [
    "Asphalt or composite shingle",
    "Wood shingle or shake",
    "Tile",
    "Metal",
    "Slate",
    "I'm not sure",
    "Other"
  ];
  
  const inspectionReasonOptions = [
    "To get roof certified",
    "To buy or sell the home",
    "Just a routine check-up",
    "To check for damage from recent bad weather",
    "For an insurance claim",
    "Other"
  ];
  
  const yesNoOptions = [
    "Yes",
    "No",
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
    const totalQuestions = 5;
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType: "Inspect a roof",
      roofSlope,
      flatRoofType,
      flatRoofOther,
      slopedRoofType,
      slopedRoofOther,
      inspectionReason,
      inspectionReasonOther,
      previousDamage,
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
          question="Is your roof sloped or flat?"
          options={roofSlopeOptions}
          value={roofSlope}
          onChange={(e) => {
            setRoofSlope(e.target.value);
            if (e.target.value === "Sloped or pitched") {
              setCurrentQuestion(2);
            } else {
              setCurrentQuestion(1);
            }
          }}
          isVisible={showQuestion(1)}
        />
        
        {roofSlope === "Flat" && (
          <FormQuestion
            question="What kind of roof do you have?"
            options={flatRoofOptions}
            value={flatRoofType}
            onChange={(e) => {
              setFlatRoofType(e.target.value);
              setCurrentQuestion(3);
            }}
            showTextbox={flatRoofType === "Other"}
            textboxValue={flatRoofOther}
            onTextboxChange={(e) => setFlatRoofOther(e.target.value)}
            isVisible={showQuestion(1)}
          />
        )}
        
        {roofSlope === "Sloped or pitched" && (
          <FormQuestion
            question="What kind of roof do you have?"
            options={slopedRoofOptions}
            value={slopedRoofType}
            onChange={(e) => {
              setSlopedRoofType(e.target.value);
              setCurrentQuestion(3);
            }}
            showTextbox={slopedRoofType === "Other"}
            textboxValue={slopedRoofOther}
            onTextboxChange={(e) => setSlopedRoofOther(e.target.value)}
            isVisible={showQuestion(2)}
          />
        )}
        
        {((roofSlope === "Flat" && flatRoofType) || 
          (roofSlope === "Sloped or pitched" && slopedRoofType)) && (
          <FormQuestion
            question="Why does the roof need an inspection? Select all that apply."
            options={inspectionReasonOptions}
            value={inspectionReason}
            onChange={(e) => {
              setInspectionReason(e.target.value);
              setCurrentQuestion(4);
            }}
            showTextbox={inspectionReason === "Other"}
            textboxValue={inspectionReasonOther}
            onTextboxChange={(e) => setInspectionReasonOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}
        
        {inspectionReason && (
          <FormQuestion
            question="Has the roof ever previously leaked or been damaged?"
            options={yesNoOptions}
            value={previousDamage}
            onChange={(e) => {
              setPreviousDamage(e.target.value);
              setCurrentQuestion(5);
            }}
            isVisible={showQuestion(4)}
          />
        )}
        
        {previousDamage && (
          <FormQuestion
            question="How many stories tall is your home?"
            options={storyOptions}
            value={stories}
            onChange={(e) => {
              setStories(e.target.value);
              setCurrentQuestion(6);
            }}
            isVisible={showQuestion(5)}
          />
        )}

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
