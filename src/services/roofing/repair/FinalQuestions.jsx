
import React from 'react';
import FormQuestion from '../../../components/FormQuestion';
import { roofAgeOptions, squareFootageOptions, yesNoOptions, storyOptions } from './repairFormOptions';

const FinalQuestions = ({ 
  roofAge, 
  setRoofAge, 
  squareFootage, 
  setSquareFootage, 
  insuranceClaim, 
  setInsuranceClaim, 
  stories, 
  setStories,
  currentQuestion,
  setCurrentQuestion,
  showQuestion
}) => {
  return (
    <>
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
      
      {squareFootage && (
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
    </>
  );
};

export default FinalQuestions;
