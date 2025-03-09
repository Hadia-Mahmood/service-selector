
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingInstallForm = ({ onComplete }) => {
  // State for all questions
  const [projectType] = useState("Install or replace a roof");
  const [roofType, setRoofType] = useState("");
  const [flatRoofType, setFlatRoofType] = useState("");
  const [flatRoofOther, setFlatRoofOther] = useState("");
  const [replacedFlatRoofType, setReplacedFlatRoofType] = useState("");
  const [replacedFlatRoofOther, setReplacedFlatRoofOther] = useState("");
  const [slopedRoofType, setSlopedRoofType] = useState("");
  const [slopedRoofOther, setSlopedRoofOther] = useState("");
  const [tileType, setTileType] = useState("");
  const [tileOther, setTileOther] = useState("");
  const [rubberType, setRubberType] = useState("");
  const [rubberOther, setRubberOther] = useState("");
  const [shingleType, setShingleType] = useState("");
  const [shingleOther, setShingleOther] = useState("");
  const [woodType, setWoodType] = useState("");
  const [replacedRoofType, setReplacedRoofType] = useState("");
  const [replacedRoofOther, setReplacedRoofOther] = useState("");
  const [isLeaking, setIsLeaking] = useState("");
  const [insuranceClaim, setInsuranceClaim] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofTypes = ["Sloped or pitched", "Flat"];
  
  const flatRoofTypes = [
    "I'm not sure",
    "PVC single-ply membrane",
    "TPO single-ply membrane",
    "Torch down modified bitumen",
    "EPDM rubber membrane",
    "Silicone spray",
    "Built-up tar and gravel",
    "Other"
  ];
  
  const slopedRoofTypes = [
    "Shingle or shake",
    "Tile",
    "Rubber",
    "Metal",
    "Slate",
    "Other"
  ];
  
  const tileTypes = [
    "Clay",
    "Concrete",
    "I'm not sure",
    "Other"
  ];
  
  const rubberTypes = [
    "EPDM rubber membrane",
    "Rubber shingles",
    "I'm not sure",
    "Other"
  ];
  
  const shingleTypes = [
    "Asphalt",
    "Composite",
    "Wood",
    "Rubber",
    "Other"
  ];
  
  const woodTypes = [
    "Shingle",
    "Shake",
    "Not sure"
  ];
  
  const roofReplacementTypes = [
    "Shingle or shake",
    "Tile",
    "Rubber",
    "Metal",
    "Slate",
    "I'm not sure",
    "No replacement, this is a new installation",
    "Other"
  ];
  
  const flatRoofReplacementTypes = [
    "I'm not sure",
    "PVC single-ply membrane",
    "TPO single-ply membrane",
    "Torch down modified bitumen",
    "EPDM rubber membrane",
    "Silicone spray",
    "Built-up tar and gravel",
    "Nothing, this is a new installation",
    "Other"
  ];
  
  const leakingOptions = [
    "Yes",
    "No",
    "I'm not sure"
  ];
  
  const insuranceClaimOptions = [
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
    const totalQuestions = 9; // Maximum number of questions possible
    // Adjust progress based on current question
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType,
      roofType,
      flatRoofType,
      flatRoofOther,
      replacedFlatRoofType,
      replacedFlatRoofOther,
      slopedRoofType,
      slopedRoofOther,
      tileType,
      tileOther,
      rubberType,
      rubberOther,
      shingleType,
      shingleOther,
      woodType,
      replacedRoofType,
      replacedRoofOther,
      isLeaking,
      insuranceClaim,
      squareFootage,
      stories
    };
    
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Roof Installation Project</h2>
      
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
          options={roofTypes}
          value={roofType}
          onChange={(e) => {
            setRoofType(e.target.value);
            if (e.target.value === "Flat") {
              setCurrentQuestion(3);
            } else if (e.target.value === "Sloped or pitched") {
              setCurrentQuestion(3);
            }
          }}
          isVisible={showQuestion(1)}
        />

        {roofType === "Flat" && (
          <FormQuestion
            question="What kind of flat roof do you want to install?"
            options={flatRoofTypes}
            value={flatRoofType}
            onChange={(e) => {
              setFlatRoofType(e.target.value);
              setCurrentQuestion(4);
            }}
            showTextbox={true}
            textboxValue={flatRoofOther}
            onTextboxChange={(e) => setFlatRoofOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}
        
        {/* Question 2 for Flat Roof */}
        {roofType === "Flat" && flatRoofType && (
          <FormQuestion
            question="What kind of roof is being replaced?"
            options={flatRoofReplacementTypes}
            value={replacedFlatRoofType}
            onChange={(e) => {
              setReplacedFlatRoofType(e.target.value);
              if (e.target.value === "Nothing, this is a new installation") {
                setCurrentQuestion(7);
              } else {
                setCurrentQuestion(6);
              }
            }}
            showTextbox={true}
            textboxValue={replacedFlatRoofOther}
            onTextboxChange={(e) => setReplacedFlatRoofOther(e.target.value)}
            isVisible={showQuestion(4)}
          />
        )}
        
        {roofType === "Sloped or pitched" && (
          <FormQuestion
            question="What kind of roof do you want?"
            options={slopedRoofTypes}
            value={slopedRoofType}
            onChange={(e) => {
              setSlopedRoofType(e.target.value);
              if (e.target.value === "Shingle or shake") {
                setCurrentQuestion(4);
              } else if (e.target.value === "Tile" || e.target.value === "Rubber") {
                setCurrentQuestion(4);
              } else {
                setCurrentQuestion(5);
              }
            }}
            showTextbox={true}
            textboxValue={slopedRoofOther}
            onTextboxChange={(e) => setSlopedRoofOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}

        {/* Question for Tile Type */}
        {slopedRoofType === "Tile" && (
          <FormQuestion
            question="What kind of tile roof do you want to install?"
            options={tileTypes}
            value={tileType}
            onChange={(e) => {
              setTileType(e.target.value);
              setCurrentQuestion(5);
            }}
            showTextbox={true}
            textboxValue={tileOther}
            onTextboxChange={(e) => setTileOther(e.target.value)}
            isVisible={showQuestion(4)}
          />
        )}

        {/* Question for Rubber Type */}
        {slopedRoofType === "Rubber" && (
          <FormQuestion
            question="What kind of rubber roof do you want to install?"
            options={rubberTypes}
            value={rubberType}
            onChange={(e) => {
              setRubberType(e.target.value);
              setCurrentQuestion(5);
            }}
            showTextbox={true}
            textboxValue={rubberOther}
            onTextboxChange={(e) => setRubberOther(e.target.value)}
            isVisible={showQuestion(4)}
          />
        )}

        {/* Question 4 for Shingle Roof */}
        {slopedRoofType === "Shingle or shake" && (
          <FormQuestion
            question="What kind of shingle roof do you want to install?"
            options={shingleTypes}
            value={shingleType}
            onChange={(e) => {
              setShingleType(e.target.value);
              if (e.target.value === "Wood") {
                // Don't advance the question yet
              } else {
                setCurrentQuestion(5);
              }
            }}
            showTextbox={true}
            textboxValue={shingleOther}
            onTextboxChange={(e) => setShingleOther(e.target.value)}
            isVisible={showQuestion(4)}
          />
        )}

        {/* Wood Type Sub-question */}
        {shingleType === "Wood" && (
          <FormQuestion
            question="What type of wood?"
            options={woodTypes}
            value={woodType}
            onChange={(e) => {
              setWoodType(e.target.value);
              setCurrentQuestion(5);
            }}
            isVisible={true}
          />
        )}

        {/* Question 5: Roof Being Replaced */}
        {((roofType === "Sloped or pitched" && (
          slopedRoofType === "Shingle or shake" && shingleType ||
          slopedRoofType === "Tile" && tileType ||
          slopedRoofType === "Rubber" && rubberType ||
          ["Metal", "Slate", "Other"].includes(slopedRoofType)
        ))) && (
          <FormQuestion
            question="What kind of roof is being replaced?"
            options={roofReplacementTypes}
            value={replacedRoofType}
            onChange={(e) => {
              setReplacedRoofType(e.target.value);
              if (e.target.value === "No replacement, this is a new installation") {
                setCurrentQuestion(7);
              } else {
                setCurrentQuestion(6);
              }
            }}
            showTextbox={true}
            textboxValue={replacedRoofOther}
            onTextboxChange={(e) => setReplacedRoofOther(e.target.value)}
            isVisible={showQuestion(5)}
          />
        )}

        {/* Question 6: Is Roof Leaking */}
        {((roofType === "Flat" && replacedFlatRoofType && replacedFlatRoofType !== "Nothing, this is a new installation") ||
          (roofType === "Sloped or pitched" && replacedRoofType && replacedRoofType !== "No replacement, this is a new installation")) && (
          <FormQuestion
            question="Is the existing roof leaking or damaged?"
            options={leakingOptions}
            value={isLeaking}
            onChange={(e) => {
              setIsLeaking(e.target.value);
              setCurrentQuestion(7);
            }}
            isVisible={showQuestion(6)}
          />
        )}

        {/* Question 7: Insurance Claim */}
        {(currentQuestion >= 7) && (
          <FormQuestion
            question="Are you filing an insurance claim for this project?"
            options={insuranceClaimOptions}
            value={insuranceClaim}
            onChange={(e) => {
              setInsuranceClaim(e.target.value);
              setCurrentQuestion(8);
            }}
            isVisible={showQuestion(7)}
          />
        )}

        {/* Question 8: Square Footage */}
        {insuranceClaim && (
          <FormQuestion
            question="What's the approximate square footage of your home?"
            options={squareFootageOptions}
            value={squareFootage}
            onChange={(e) => {
              setSquareFootage(e.target.value);
              setCurrentQuestion(9);
            }}
            isVisible={showQuestion(8)}
          />
        )}

        {/* Question 9: Stories */}
        {squareFootage && (
          <FormQuestion
            question="How many stories tall is your home?"
            options={storyOptions}
            value={stories}
            onChange={(e) => {
              setStories(e.target.value);
              setCurrentQuestion(10);
            }}
            isVisible={showQuestion(9)}
          />
        )}

        {/* Submit Button (only show when all relevant questions are answered) */}
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

export default RoofingInstallForm;
