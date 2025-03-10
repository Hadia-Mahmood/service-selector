
import React, { useState, useEffect } from 'react';

const RoofingOtherForm = ({ onComplete }) => {
  // State for project description
  const [projectDescription, setProjectDescription] = useState("");
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  
  // Calculate the form progress
  useEffect(() => {
    const progress = projectDescription.length > 10 ? 100 : 0;
    setFormProgress(progress);
    setIsSubmittable(projectDescription.length > 10);
  }, [projectDescription]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectType: "Other roofing project",
      projectDescription
    };
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Roofing Project</h2>
      
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
        {/* Custom description field */}
        <div className="w-full mb-8 entered">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
              Question
            </label>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Please describe your roofing project in detail</h3>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full h-56 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Provide as much detail as possible about your roofing project..."
            rows={8}
          />
          {projectDescription.length <= 10 && (
            <p className="text-sm text-gray-500 mt-2">Please provide at least 10 characters.</p>
          )}
        </div>
        
        {/* Submit Button */}
        {isSubmittable && (
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

export default RoofingOtherForm;
