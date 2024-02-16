import React, { useState } from "react";

interface UserData {
  fullname?: string;
  email?: string;
  username?: string;
  phone?: string;
  bio?: string;
}

interface PhoneValidationProps {
  userData: UserData | null; // Allow null values
  handleInput: (name: string, event: any) => void;
  setPhoneValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhoneValidation: React.FC<PhoneValidationProps> = ({
  userData,
  handleInput,
  setPhoneValid,
}) => {
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState(userData?.phone || "");

  const handleInputValidation = (field: any, defaultValue: any) => {
    if (field === "phone") {
      setPhone(defaultValue);
      if (/^[0-9]+$/.test(defaultValue) && defaultValue.length == 8) {
        // If the value contains only numbers
        setPhoneValid(true); // Assuming phone is valid if it contains only numbers
      } else {
        setPhoneValid(false);
      }
    }
  };

  return (
    <div className="w-full sm:w-1/2">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="phone"
      >
        Phone Number
      </label>

      <div className="indicator w-full">
        <span className="badge indicator-item">Required</span>

        <input
          className={`w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
          type="text"
          name="phone"
          id="phone"
          onChange={(e) => {
            handleInput("phone", e.target.value); // Adjusted to pass correct field name
            handleInputValidation("phone", e.target.value); // Adjusted to pass correct field name
          }}
          placeholder={userData?.phone}
        />
      </div>
    </div>
  );
};

export default PhoneValidation;
