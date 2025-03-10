
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [userData] = useState([{ firstName: "John", lastName: "Doe", email: "john.doe@example.com", number: "1234567890" }]);

  // Mock services data
  const services = [
    { _id: "carpenter123", name: "Carpenter" },
    { _id: "roofing123", name: "Roofing" }
  ];

  const handleServiceSelect = (serviceData) => {
    setServiceId(serviceData?._id);
    setServiceName(serviceData?.name);
    
    // Store user data in localStorage for access in service pages
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Navigate to the appropriate service page
    if (serviceData?.name === "Roofing") {
      navigate("/roofing");
    } else if (serviceData?.name === "Carpenter") {
      navigate("/carpenter");
    }
  };

  return (
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
                handleServiceSelect(selectedService);
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
        </div>
      </div>
    </div>
  );
};

export default Index;
