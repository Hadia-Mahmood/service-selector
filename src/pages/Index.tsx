
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CarpenterForm from "../services/carpenter/CarpenterForm";
import RoofingForm from "../services/roofing/RoofingForm";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userData, setUserData] = useState([{ firstName: "John", lastName: "Doe", email: "john.doe@example.com", number: "1234567890" }]);

  // Mock services data
  const services = [
    { _id: "carpenter123", name: "Carpenter" },
    { _id: "roofing123", name: "Roofing" }
  ];

  const onChangeService = (data: any) => {
    setServiceId(data?._id);
    setServiceName(data?.name);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form Submitted:", formData);
    toast({
      title: "Success!",
      description: "Your project has been created successfully.",
    });
    // In a real application, this would send data to your backend
    // Then navigate or show completion state
    setCompleted(true);
  };

  // Render the appropriate form based on service selection
  const renderServiceForm = () => {
    switch (serviceName) {
      case "Carpenter":
        return (
          <CarpenterForm 
            userData={userData} 
            onSubmit={handleSubmit} 
            setcompleted={setCompleted} 
          />
        );
      case "Roofing":
        return (
          <RoofingForm 
            userData={userData} 
            onSubmit={handleSubmit} 
            setcompleted={setCompleted} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {completed ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg mb-6">
              Your project request has been submitted. Select an option below to view your project.
            </p>

            <div className="mb-5">
              <label className="font-semibold">Email: {userData[0].email}</label>
            </div>

            <button 
              onClick={() => navigate("/")}
              className="w-full py-3 mb-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded transition-colors"
            >
              Login via Email
            </button>
            
            <div className="my-4 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-gray-500 text-sm">OR</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="font-semibold">Phone: +{userData[0].number}</label>
            </div>
            
            <button 
              onClick={() => navigate("/")}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors"
            >
              Login via SMS
            </button>
            
            <hr className="my-6" />
            
            <p className="text-gray-600">Need Help?</p>
            <a href="mailto:homeowner@barnesnest.com" className="text-blue-500 hover:text-blue-700 font-medium">
              homeowner@barnesnest.com
            </a>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Project</h2>
              
              {/* Service Selection */}
              <div className="mb-6">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Select a Service:
                </label>
                <select
                  id="service"
                  value={serviceId}
                  onChange={(e) => {
                    const selectedService = services.find(
                      (service) => service._id === e.target.value
                    );
                    onChangeService(selectedService);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select a Service</option>
                  {services?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Display selected service form */}
              {serviceName && renderServiceForm()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
