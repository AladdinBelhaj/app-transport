import React from "react";
import { useState } from "react";

interface UserData {
  fullname?: string;
  email?: string;
  username?: string;
  phone?: string;
  bio?: string;
}

interface UsernameValidationProps {
  userData: UserData | null; // Allow null values
  handleInput: (name: string, event: any) => void;
  setUsernameValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsernameValidation: React.FC<UsernameValidationProps> = ({
  userData,
  handleInput,
  setUsernameValid,
}) => {
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState(userData?.username || "");
  const handleInputValidation = (field: any, defaultValue: any) => {
    if (field === "username") {
      setUsername(defaultValue);
      if (defaultValue.length == 0) {
        setUsernameValid(false);
      } else {
        setUsernameValid(true);
      }
    }
  };
  return (
    <div className="mb-5.5">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="username"
      >
        Username
      </label>

      <div className="indicator w-full">
        <span className="badge indicator-item">Optional</span>

        <input
          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          name="username"
          id="username"
          onChange={(e) => {
            handleInput("username", e.target.value); // Adjusted to pass correct field name
            handleInputValidation("username", e.target.value); // Adjusted to pass correct field name
          }}
          placeholder={userData?.username}
        />
      </div>
    </div>
  );
};

export default UsernameValidation;
