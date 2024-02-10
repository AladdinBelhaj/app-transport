import React, { useState } from "react";

const EmailValidation = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleInput = (field: any, value: any) => {
    if (field === "email") {
      setEmail(value);
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email");
      } else {
        setEmailError("");
      }
    }
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <input
          type="email"
          onChange={(e) => handleInput("email", e.target.value)}
          name="email"
          placeholder="Enter your email"
          className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${emailError && "border-red-500"}`}
        />
      </div>
      {emailError && (
        <p className="text-red-500 absolute right-0 top-0">{emailError}</p>
      )}
    </div>
  );
};

export default EmailValidation;
