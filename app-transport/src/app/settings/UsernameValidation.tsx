import React from "react";

interface UserData {
  fullname?: string;
  email?: string;
  username?: string;
  phone?: string;
  bio?: string;
}

interface UsernameValidationProps {
  userData: UserData | null; // Allow null values
  handleChange: (e: any) => void;
}

const UsernameValidation: React.FC<UsernameValidationProps> = ({
  userData,
  handleChange,
}) => {
  return (
    <div className="mb-5.5">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
        defaultValue={userData?.username}
        placeholder={userData?.username}
      />
    </div>
  );
};

export default UsernameValidation;
