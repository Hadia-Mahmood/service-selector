
import React, { useState, useEffect } from 'react';
import FormQuestion from '../../components/FormQuestion';

const RoofingSkylightsForm = ({ onComplete }) => {
  // State for questions
  const [skylightProject, setSkylightProject] = useState("");
  const [skylightProjectOther, setSkylightProjectOther] = useState("");
  const [skylightCount, setSkylightCount] = useState("");
  const [skylightIssues, setSkylightIssues] = useState("");
  const [skylightIssuesOther, setSkylightIssuesOther] = useState("");
  const [installCount, setInstallCount] = useState("");
  const [installType, setInstallType] = useState("");
  const [roofType, setRoofType] = useState("");
  const [roofTypeOther, setRoofTypeOther] = useState("");
  const [stories, setStories] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const projectTypes = [
    "Install a skylight",
    "Repair or maintain a skylight",
    "Other"
  ];
  
  const countOptions = [
    "1",
    "2",
    "3 or more"
  ];
  
  const skylightIssuesOptions = [
    "Leaking and dampness around skylight",
    "Cracked or broken glass",
    "Fogging between glass panes",
    "Malfunctioning skylight shade",
    "Malfunctioning skylight opener",
    "Other"
  ];
  
  const installTypeOptions = [
    "Replace existing skylight",
    "Install a new skylight",
    "Both"
  ];
  
  const roofTypeOptions = [
    "Asphalt or composite shingle",
    "Wood shingle or shake",
    "Tile",
    "Metal",
    "Single ply or rubber membrane",
    "Built-up tar and gravel",
    "I'm not sure",
    "Other"
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
      skylightProjectOther,
      skylightCount,
      skylightIssues,
      skylightIssuesOther,
      installCount,
      installType,
      roofType,
      roofTypeOther,
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
          question="Do you want to install or repair a skylight?"
          options={projectTypes}
          value={skylightProject}
          onChange={(e) => {
            setSkylightProject(e.target.value);
            if (e.target.value === "Install a skylight") {
              setCurrentQuestion(5);
            } else if (e.target.value === "Repair or maintain a skylight") {
              setCurrentQuestion(3);
            } else {
              setCurrentQuestion(2);
            }
          }}
          showTextbox={skylightProject === "Other"}
          textboxValue={skylightProjectOther}
          onTextboxChange={(e) => setSkylightProjectOther(e.target.value)}
          isVisible={showQuestion(1)}
        />
        
        {skylightProject === "Other" && (
          <FormQuestion
            question="How many skylights are part of this project?"
            options={countOptions}
            value={skylightCount}
            onChange={(e) => {
              setSkylightCount(e.target.value);
              setCurrentQuestion(8);
            }}
            isVisible={showQuestion(2)}
          />
        )}
        
        {skylightProject === "Repair or maintain a skylight" && (
          <FormQuestion
            question="How many skylights do you want to repair or maintain?"
            options={countOptions}
            value={skylightCount}
            onChange={(e) => {
              setSkylightCount(e.target.value);
              setCurrentQuestion(4);
            }}
            isVisible={showQuestion(3)}
          />
        )}
        
        {skylightProject === "Repair or maintain a skylight" && skylightCount && (
          <FormQuestion
            question="What issues have you noticed? Select all that apply."
            options={skylightIssuesOptions}
            value={skylightIssues}
            onChange={(e) => {
              setSkylightIssues(e.target.value);
              setCurrentQuestion(7);
            }}
            showTextbox={skylightIssues === "Other"}
            textboxValue={skylightIssuesOther}
            onTextboxChange={(e) => setSkylightIssuesOther(e.target.value)}
            isVisible={showQuestion(4)}
          />
        )}
        
        {skylightProject === "Install a skylight" && (
          <FormQuestion
            question="How many skylights do you want to install?"
            options={countOptions}
            value={installCount}
            onChange={(e) => {
              setInstallCount(e.target.value);
              setCurrentQuestion(6);
            }}
            isVisible={showQuestion(5)}
          />
        )}
        
        {skylightProject === "Install a skylight" && installCount && (
          <FormQuestion
            question="Do you want to replace an existing skylight or install a new one?"
            options={installTypeOptions}
            value={installType}
            onChange={(e) => {
              setInstallType(e.target.value);
              setCurrentQuestion(7);
            }}
            isVisible={showQuestion(6)}
          />
        )}
        
        {((skylightProject === "Install a skylight" && installType) || 
          (skylightProject === "Repair or maintain a skylight" && skylightIssues)) && (
          <FormQuestion
            question="What kind of roof do you have?"
            options={roofTypeOptions}
            value={roofType}
            onChange={(e) => {
              setRoofType(e.target.value);
              setCurrentQuestion(8);
            }}
            showTextbox={roofType === "Other"}
            textboxValue={roofTypeOther}
            onTextboxChange={(e) => setRoofTypeOther(e.target.value)}
            isVisible={showQuestion(7)}
          />
        )}
        
        {((skylightProject === "Install a skylight" && roofType) || 
          (skylightProject === "Repair or maintain a skylight" && roofType) ||
          (skylightProject === "Other" && skylightCount)) && (
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

export default RoofingSkylightsForm;
