
import React from 'react';
import FormQuestion from '../../../components/FormQuestion';
import { roofTypeOptions, flashingIssuesOptions, flashingMaterialOptions } from './repairFormOptions';

const FlashingRepairQuestions = ({ 
  roofType, 
  setRoofType, 
  flashingIssues, 
  setFlashingIssues, 
  flashingMaterial, 
  setFlashingMaterial, 
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
      
      {roofType && (
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
      
      {flashingIssues && (
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
    </>
  );
};

export default FlashingRepairQuestions;
