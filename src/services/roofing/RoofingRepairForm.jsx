import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingRepairForm = ({ onComplete }) => {
  // State for questions
  const [flashingRepair, setFlashingRepair] = useState("");
  const [roofType, setRoofType] = useState("");
  const [flashingIssues, setFlashingIssues] = useState("");
  const [flashingMaterial, setFlashingMaterial] = useState("");
  const [roofSlope, setRoofSlope] = useState("");
  const [flatRoofType, setFlatRoofType] = useState("");
  const [flatRoofOther, setFlatRoofOther] = useState("");
  const [slopedRoofType, setSlopedRoofType] = useState("");
  const [shingleType, setShingleType] = useState("");
  const [woodType, setWoodType] = useState("");
  const [tileType, setTileType] = useState("");
  const [tileOther, setTileOther] = useState("");
  const [roofIssues, setRoofIssues] = useState("");
  const [roofIssuesOther, setRoofIssuesOther] = useState("");
  const [flatRoofIssues, setFlatRoofIssues] = useState("");
  const [flatRoofIssuesOther, setFlatRoofIssuesOther] = useState("");
  const [roofAge, setRoofAge] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [insuranceClaim, setInsuranceClaim] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const flashingRepairOptions = [
    "Yes I need roof flashing repair",
    "No it's something else",
    "I'm not sure"
  ];
  
  const roofTypeOptions = [
    "Asphalt or composite shingle",
    "Tile",
    "Metal",
    "Wood shingle",
    "PVC or TPO single ply membrane",
    "Torch down modified bitumen",
    "Built-up tar and gravel",
    "I'm not sure",
    "Other"
  ];
  
  const flashingIssuesOptions = [
    "Water leaks into the home",
    "Flashing is cracked or rusted",
    "Flashing is missing",
    "Flashing pulls away from the roof",
    "Other"
  ];
  
  const flashingMaterialOptions = [
    "I'm not sure",
    "Lead",
    "Aluminum",
    "Copper",
    "Steel",
    "PVC or plastic",
    "Other"
  ];
  
  const roofSlopeOptions = [
    "Sloped or pitched",
    "Flat"
  ];
  
  const flatRoofTypeOptions = [
    "I'm not sure",
    "PVC single-ply membrane",
    "TPO single-ply membrane",
    "Torch down modified bitumen",
    "EPDM rubber membrane",
    "Silicone spray",
    "Built-up tar and gravel",
    "Other"
  ];
  
  const slopedRoofTypeOptions = [
    "Shingle or shake",
    "Tile",
    "Rubber",
    "Metal",
    "Slate",
    "Other"
  ];
  
  const shingleTypeOptions = [
    "Asphalt or composite",
    "Wood",
    "Rubber",
    "Other"
  ];
  
  const woodTypeOptions = [
    "I'm not sure",
    "Shingle",
    "Shake"
  ];
  
  const tileTypeOptions = [
    "Clay",
    "Concrete",
    "I'm not sure",
    "Other"
  ];
  
  const roofIssuesOptions = [
    "Water leaks into the home",
    "Water stains on ceilings",
    "Icicles or ice damn build-up",
    "Damaged or missing flashing",
    "Damaged or missing roof sections",
    "Roof sags",
    "Other"
  ];
  
  const flatRoofIssuesOptions = [
    "Water leaks into the home",
    "Water stains on ceilings",
    "Damaged or missing flashing",
    "Roof is sagging",
    "Puddles and standing water",
    "Bubbling, blistering or cracking membrane",
    "Other"
  ];
  
  const roofAgeOptions = [
    "Less than 5 years old",
    "5-10 years old",
    "10-20 years old",
    "20-30 years old",
    "More than 30 years old",
    "I'm not sure"
  ];
  
  const squareFootageOptions = [
    "Under 1000 sq ft",
    "1000-2000 sq ft",
    "2000-3000 sq ft",
    "Over 3000 sq ft",
    "I'm not sure"
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
    const totalQuestions = 15; // Maximum number of questions possible
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType: "Repair a roof",
      flashingRepair,
      roofType,
      flashingIssues,
      flashingMaterial,
      roofSlope,
      flatRoofType,
      flatRoofOther,
      slopedRoofType,
      shingleType,
      woodType,
      tileType,
      tileOther,
      roofIssues,
      roofIssuesOther,
      flatRoofIssues,
      flatRoofIssuesOther,
      roofAge,
      squareFootage,
      insuranceClaim,
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
          question="Do you just need roof flashing repair or something else?"
          options={flashingRepairOptions}
          value={flashingRepair}
          onChange={(e) => {
            setFlashingRepair(e.target.value);
            if (e.target.value === "No it's something else" || e.target.value === "I'm not sure") {
              setCurrentQuestion(5);
            } else {
              setCurrentQuestion(2);
            }
          }}
          isVisible={showQuestion(1)}
        />
        
        {flashingRepair === "Yes I need roof flashing repair" && (
          <FormQuestion
            question="What kind of roof do you have?"
            options={roofTypeOptions}
            value={roofType}
            onChange={(e) => {
              setRoofType(e.target.value);
              setCurrentQuestion(3);
            }}
            isVisible={showQuestion(2)}
            showTextbox={roofType === "Other"}
            textboxValue={roofType === "Other" ? roofIssuesOther : ""}
            onTextboxChange={(e) => setRoofIssuesOther(e.target.value)}
          />
        )}
        
        {flashingRepair === "Yes I need roof flashing repair" && roofType && (
          <FormQuestion
            question="What issues have you noticed with the roof flashing? Select all that apply."
            options={flashingIssuesOptions}
            value={flashingIssues}
            onChange={(e) => {
              setFlashingIssues(e.target.value);
              setCurrentQuestion(4);
            }}
            isVisible={showQuestion(3)}
            showTextbox={flashingIssues === "Other"}
            textboxValue={flashingIssues === "Other" ? roofIssuesOther : ""}
            onTextboxChange={(e) => setRoofIssuesOther(e.target.value)}
          />
        )}
        
        {flashingRepair === "Yes I need roof flashing repair" && flashingIssues && (
          <FormQuestion
            question="What's kind of flashing material is currently on the roof?"
            options={flashingMaterialOptions}
            value={flashingMaterial}
            onChange={(e) => {
              setFlashingMaterial(e.target.value);
              setCurrentQuestion(14);
            }}
            isVisible={showQuestion(4)}
            showTextbox={flashingMaterial === "Other"}
            textboxValue={flashingMaterial === "Other" ? roofIssuesOther : ""}
            onTextboxChange={(e) => setRoofIssuesOther(e.target.value)}
          />
        )}
        
        {(flashingRepair === "No it's something else" || flashingRepair === "I'm not sure") && (
          <FormQuestion
            question="Do you have a sloped, pitched or flat roof?"
            options={roofSlopeOptions}
            value={roofSlope}
            onChange={(e) => {
              setRoofSlope(e.target.value);
              if (e.target.value === "Sloped or pitched") {
                setCurrentQuestion(7);
              } else {
                setCurrentQuestion(6);
              }
            }}
            isVisible={showQuestion(5)}
          />
        )}
        
        {roofSlope === "Flat" && (
          <FormQuestion
            question="What kind of roof do you have?"
            options={flatRoofTypeOptions}
            value={flatRoofType}
            onChange={(e) => {
              setFlatRoofType(e.target.value);
              setCurrentQuestion(11);
            }}
            isVisible={showQuestion(6)}
            showTextbox={flatRoofType === "Other"}
            textboxValue={flatRoofOther}
            onTextboxChange={(e) => setFlatRoofOther(e.target.value)}
          />
        )}
        
        {roofSlope === "Sloped or pitched" && (
          <FormQuestion
            question="What kind of roof do you have?"
            options={slopedRoofTypeOptions}
            value={slopedRoofType}
            onChange={(e) => {
              setSlopedRoofType(e.target.value);
              if (e.target.value === "Shingle or shake") {
                setCurrentQuestion(8);
              } else if (e.target.value === "Tile") {
                setCurrentQuestion(10);
              } else {
                setCurrentQuestion(10);
              }
            }}
            isVisible={showQuestion(7)}
          />
        )}
        
        {slopedRoofType === "Shingle or shake" && (
          <FormQuestion
            question="What type of shingle roof needs to be repaired?"
            options={shingleTypeOptions}
            value={shingleType}
            onChange={(e) => {
              setShingleType(e.target.value);
              if (e.target.value === "Wood") {
                setCurrentQuestion(9);
              } else {
                setCurrentQuestion(10);
              }
            }}
            isVisible={showQuestion(8)}
          />
        )}
        
        {shingleType === "Wood" && (
          <FormQuestion
            question="Is the roof wood shingle or shake?"
            options={woodTypeOptions}
            value={woodType}
            onChange={(e) => {
              setWoodType(e.target.value);
              setCurrentQuestion(10);
            }}
            isVisible={showQuestion(9)}
          />
        )}
        
        {slopedRoofType === "Tile" && (
          <FormQuestion
            question="What kind of tile roof do you have?"
            options={tileTypeOptions}
            value={tileType}
            onChange={(e) => {
              setTileType(e.target.value);
              setCurrentQuestion(10);
            }}
            isVisible={showQuestion(9)}
            showTextbox={tileType === "Other"}
            textboxValue={tileOther}
            onTextboxChange={(e) => setTileOther(e.target.value)}
          />
        )}
        
        {((slopedRoofType && slopedRoofType !== "Shingle or shake" && slopedRoofType !== "Tile") || 
          (slopedRoofType === "Shingle or shake" && shingleType && shingleType !== "Wood") ||
          (slopedRoofType === "Shingle or shake" && shingleType === "Wood" && woodType) ||
          (slopedRoofType === "Tile" && tileType)) && (
          <FormQuestion
            question="What issues are you currently experiencing with your roof? Select all that apply."
            options={roofIssuesOptions}
            value={roofIssues}
            onChange={(e) => {
              setRoofIssues(e.target.value);
              setCurrentQuestion(12);
            }}
            isVisible={showQuestion(10)}
            showTextbox={roofIssues === "Other"}
            textboxValue={roofIssuesOther}
            onTextboxChange={(e) => setRoofIssuesOther(e.target.value)}
          />
        )}
        
        {roofSlope === "Flat" && flatRoofType && (
          <FormQuestion
            question="What issues have you noticed with the roof? Select all that apply."
            options={flatRoofIssuesOptions}
            value={flatRoofIssues}
            onChange={(e) => {
              setFlatRoofIssues(e.target.value);
              setCurrentQuestion(12);
            }}
            isVisible={showQuestion(11)}
            showTextbox={flatRoofIssues === "Other"}
            textboxValue={flatRoofIssuesOther}
            onTextboxChange={(e) => setFlatRoofIssuesOther(e.target.value)}
          />
        )}
        
        {((roofSlope === "Sloped or pitched" && roofIssues) || (roofSlope === "Flat" && flatRoofIssues)) && (
          <FormQuestion
            question="Approximately how old is your roof?"
            options={roofAgeOptions}
            value={roofAge}
            onChange={(e) => {
              setRoofAge(e.target.value);
              setCurrentQuestion(13);
            }}
            isVisible={showQuestion(12)}
          />
        )}
        
        {roofAge && (
          <FormQuestion
            question="What's the approximate square footage of your home?"
            options={squareFootageOptions}
            value={squareFootage}
            onChange={(e) => {
              setSquareFootage(e.target.value);
              setCurrentQuestion(14);
            }}
            isVisible={showQuestion(13)}
          />
        )}
        
        {(squareFootage || flashingMaterial) && (
          <FormQuestion
            question="Are you filing an insurance claim for this project?"
            options={yesNoOptions}
            value={insuranceClaim}
            onChange={(e) => {
              setInsuranceClaim(e.target.value);
              setCurrentQuestion(15);
            }}
            isVisible={showQuestion(14)}
          />
        )}
        
        {insuranceClaim && (
          <FormQuestion
            question="How many stories tall is your home?"
            options={storyOptions}
            value={stories}
            onChange={(e) => {
              setStories(e.target.value);
              setCurrentQuestion(16);
            }}
            isVisible={showQuestion(15)}
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

export default RoofingRepairForm;
