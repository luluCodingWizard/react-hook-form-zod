import React, { useState } from "react";
import mockAPICall from "../../lib/mockApiCall";
const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.email.includes("@")) newErrors.email = "Email is invalid";
    if (!formData.terms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation errors:", errors);
      return;
    }
    mockAPICall(false);
    console.log("Submitting:", formData);
    alert("Form Submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className=" bg-gray-200 w-4/5 mx-auto p-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className=" border-gray-600 border-2 mt-2"
      />
      {errors.name && <p className=" text-sm text-red-600">{errors.name}</p>}
      <br />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Enter your age"
        className=" border-gray-600 border-2 mt-2"
      />
      {errors.age && <p className=" text-sm text-red-600">{errors.age}</p>}

      <br />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className=" border-gray-600 border-2 mt-2"
      />
      {errors.email && <p className=" text-sm text-red-600">{errors.email}</p>}

      <br />

      <label className="mt-2 block">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
        />
        Agree to terms and conditions
      </label>
      {errors.terms && <p className=" text-sm text-red-600">{errors.terms}</p>}

      <br />

      <button
        type="submit"
        className="mt-4 bg-red-200 hover:bg-red-400 p-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default Index;
