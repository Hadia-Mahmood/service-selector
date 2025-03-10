
import React from 'react';
import FormQuestion from '../../../components/FormQuestion';
import { flatRoofTypeOptions, flatRoofIssuesOptions } from './repairFormOptions';

const FlatRoofQuestions = ({ 
  flatRoofType, 
  setFlatRoofType, 
  flatRoofOther, 
  setFlatRoofOther, 
  flatRoofIssues, 
  setFlatRoofIssues, 
  flatRoofIssuesOther, 
  setFlatRoofIssuesOther,
  currentQuestion,
  setCurrentQuestion,
  showQuestion
}) => {
  return (
    <>
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
      
      {flatRoofType && (
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
    </>
  );
};

export default FlatRoofQuestions;
