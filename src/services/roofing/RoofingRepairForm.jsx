
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';
import FlashingRepairQuestions from './repair/FlashingRepairQuestions';
import FlatRoofQuestions from './repair/FlatRoofQuestions';
import SlopedRoofQuestions from './repair/SlopedRoofQuestions';
import FinalQuestions from './repair/FinalQuestions';
import { flashingRepairOptions, roofSlopeOptions } from './repair/repairFormOptions';

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
          <FlashingRepairQuestions
            roofType={roofType}
            setRoofType={setRoofType}
            flashingIssues={flashingIssues}
            setFlashingIssues={setFlashingIssues}
            flashingMaterial={flashingMaterial}
            setFlashingMaterial={setFlashingMaterial}
            roofIssuesOther={roofIssuesOther}
            setRoofIssuesOther={setRoofIssuesOther}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            showQuestion={showQuestion}
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
          <FlatRoofQuestions
            flatRoofType={flatRoofType}
            setFlatRoofType={setFlatRoofType}
            flatRoofOther={flatRoofOther}
            setFlatRoofOther={setFlatRoofOther}
            flatRoofIssues={flatRoofIssues}
            setFlatRoofIssues={setFlatRoofIssues}
            flatRoofIssuesOther={flatRoofIssuesOther}
            setFlatRoofIssuesOther={setFlatRoofIssuesOther}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            showQuestion={showQuestion}
          />
        )}
        
        {roofSlope === "Sloped or pitched" && (
          <SlopedRoofQuestions
            slopedRoofType={slopedRoofType}
            setSlopedRoofType={setSlopedRoofType}
            shingleType={shingleType}
            setShingleType={setShingleType}
            woodType={woodType}
            setWoodType={setWoodType}
            tileType={tileType}
            setTileType={setTileType}
            tileOther={tileOther}
            setTileOther={setTileOther}
            roofIssues={roofIssues}
            setRoofIssues={setRoofIssues}
            roofIssuesOther={roofIssuesOther}
            setRoofIssuesOther={setRoofIssuesOther}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            showQuestion={showQuestion}
          />
        )}
        
        {((roofSlope === "Sloped or pitched" && roofIssues) || (roofSlope === "Flat" && flatRoofIssues) || flashingMaterial) && (
          <FinalQuestions
            roofAge={roofAge}
            setRoofAge={setRoofAge}
            squareFootage={squareFootage}
            setSquareFootage={setSquareFootage}
            insuranceClaim={insuranceClaim}
            setInsuranceClaim={setInsuranceClaim}
            stories={stories}
            setStories={setStories}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            showQuestion={showQuestion}
          />
        )}
      </form>
    </div>
  );
};

export default RoofingRepairForm;
