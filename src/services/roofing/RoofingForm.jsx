
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoofingInstallForm from './RoofingInstallForm';
import RoofingRepairForm from './RoofingRepairForm';
import RoofingCleanForm from './RoofingCleanForm';
import RoofingSkylightsForm from './RoofingSkylightsForm';
import RoofingInspectForm from './RoofingInspectForm';
import RoofingOtherForm from './RoofingOtherForm';
import CarpenterForm from '../carpenter/CarpenterForm';
import { useToast } from "@/hooks/use-toast";

const RoofingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [roofingType, setRoofingType] = useState("");
  const [showCarpenterForm, setShowCarpenterForm] = useState(false);
  const [roofingFormData, setRoofingFormData] = useState(null);
  const [userData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : [{ firstName: "John", lastName: "Doe", email: "john.doe@example.com", number: "1234567890" }];
  });

  // Handle form transition
  const handleRoofingFormComplete = (formData) => {
    setRoofingFormData(formData);
    setShowCarpenterForm(true);
  };

  // Handle final submission combining roofing and carpenter data
  const handleFinalSubmit = (carpenterData) => {
    const combinedData = {
      ...roofingFormData,
      ...carpenterData,
      roofingType
    };
    console.log("Final form data:", combinedData);
    toast({
      title: "Success!",
      description: "Your project has been created successfully.",
    });
    navigate('/');
  };

  // Render the appropriate roofing subtype form based on selection
  const renderRoofingSubtypeForm = () => {
    switch (roofingType) {
      case "Install or replace a roof":
        return <RoofingInstallForm onComplete={handleRoofingFormComplete} />;
      case "Repair a roof":
        return <RoofingRepairForm onComplete={handleRoofingFormComplete} />;
      case "Clean a roof":
        return <RoofingCleanForm onComplete={handleRoofingFormComplete} />;
      case "Install, repair or maintain skylights":
        return <RoofingSkylightsForm onComplete={handleRoofingFormComplete} />;
      case "Inspect a roof":
        return <RoofingInspectForm onComplete={handleRoofingFormComplete} />;
      case "Other":
        return <RoofingOtherForm onComplete={handleRoofingFormComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        {!roofingType ? (
          // Initial roofing type selection
          <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Roofing Service Request</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What kind of roofing project do you need help with?
              </label>
              <select
                value={roofingType}
                onChange={(e) => setRoofingType(e.target.value)}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select a roofing service</option>
                <option value="Install or replace a roof">Install or replace a roof</option>
                <option value="Repair a roof">Repair a roof</option>
                <option value="Clean a roof">Clean a roof</option>
                <option value="Install, repair or maintain skylights">Install, repair or maintain skylights</option>
                <option value="Inspect a roof">Inspect a roof</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        ) : showCarpenterForm ? (
          // After subtype form is completed, show the carpenter form
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Project Details</h2>
            <p className="mb-4 text-gray-600">Please provide some additional information about your project.</p>
            <CarpenterForm 
              userData={userData} 
              onSubmit={handleFinalSubmit}
              serviceName={roofingType}
            />
          </>
        ) : (
          // Show the selected roofing subtype form
          renderRoofingSubtypeForm()
        )}
      </div>
    </div>
  );
};

export default RoofingForm;
