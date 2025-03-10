
import React from 'react';
import FormQuestion from '../../../components/FormQuestion';
import { 
  slopedRoofTypeOptions, 
  shingleTypeOptions, 
  woodTypeOptions, 
  tileTypeOptions, 
  roofIssuesOptions 
} from './repairFormOptions';

const SlopedRoofQuestions = ({ 
  slopedRoofType, 
  setSlopedRoofType, 
  shingleType, 
  setShingleType, 
  woodType, 
  setWoodType, 
  tileType, 
  setTileType, 
  tileOther, 
  setTileOther,
  roofIssues, 
  setRoofIssues, 
  roofIssuesOther, 
  setRoofIssuesOther,
  currentQuestion,
  setCurrentQuestion,
  showQuestion
}) => {
  return (
    <>
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
    </>
  );
};

export default SlopedRoofQuestions;
