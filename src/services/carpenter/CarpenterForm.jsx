
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USStates } from '../../common/Constant';

const CarpenterForm = ({ userData, onSubmit, serviceName = "Carpenter" }) => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [location, setLocation] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectName,
      description,
      price,
      timeframe,
      location,
    };
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{serviceName} Service Request</h2>
      <form onSubmit={handleSubmit}>
        {/* Project Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            What's the title of the project?
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Title"
            className="input input-bordered w-full mt-1 mb-2"
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Write the project details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you need help with..."
            className="input input-bordered w-full mt-1 mb-2"
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Your budget for this Project (Prices will be in USD)
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Add Price Here"
            className="input input-bordered w-full mt-1 mb-2"
            required
          />
          <label
            htmlFor="timeframe"
            className="block text-sm font-medium text-gray-700"
          >
            Great, when would you like to get this done?
          </label>
          <select
            id="timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="select select-bordered w-full mt-1"
            required
          >
            <option value="">Select timeframe</option>
            <option value="flexible">I am flexible</option>
            <option value="48hours">Within 48 hours</option>
            <option value="week">Within a week</option>
            <option value="month">Within a month</option>
            <option value="year">Within a year</option>
          </select>
        </div>

        {/* Location Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            What's the location for the project?
          </label>
          <select
            value={location.state}
            onChange={handleLocationChange}
            className="select select-bordered w-full mt-1"
            name="state"
            required
          >
            <option value="">Select State</option>
            {Object.keys(USStates)?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={location.city}
            onChange={handleLocationChange}
            className="select select-bordered w-full mt-1"
            name="city"
            required
            disabled={!location.state}
          >
            <option value="">Select City</option>
            {location.state && USStates[location.state]?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="street"
            value={location.street}
            onChange={handleLocationChange}
            placeholder="Street Address"
            className="input input-bordered w-full mt-1 mb-2"
            required
          />

          <input
            type="text"
            name="zipcode"
            value={location.zipcode}
            onChange={handleLocationChange}
            placeholder="Zipcode"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Contact Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Let's get acquainted
          </label>
          <input
            type="text"
            name="firstName"
            value={userData && userData.length > 0 ? userData[0].firstName : ""}
            placeholder="First Name"
            className="input input-bordered w-full mt-1 mb-2 capitalize"
            disabled={true}
          />
          <input
            type="text"
            name="lastName"
            value={userData && userData.length > 0 ? userData[0].lastName : ""}
            placeholder="Last Name"
            className="input input-bordered w-full mt-1 mb-2 capitalize"
            disabled={true}
          />
          <input
            type="text"
            name="phone"
            value={userData && userData.length > 0 ? `+${userData[0].number}` : ""}
            placeholder="Phone Number"
            className="input input-bordered w-full mt-1 mb-2 capitalize"
            disabled={true}
          />
          <input
            type="email"
            name="email"
            value={userData && userData.length > 0 ? userData[0].email : ""}
            placeholder="Email"
            className="input input-bordered w-full mt-1"
            disabled={true}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-success w-full mt-4 text-white"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarpenterForm;
