import React from 'react';

interface UserData {
  fullname?: string;
  email?: string;
  username?: string;
  phone?: string;
  bio?: string;
}

interface PhoneValidationProps {
  userData: UserData | null; // Allow null values
  handleChange: (e: any) => void;
}

const PhoneValidation: React.FC<PhoneValidationProps> = ({ userData, handleChange }) => {


    return (
            <div className="w-full sm:w-1/2">
                <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phone"
                >
                    Phone Number
                </label>
                <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                    defaultValue={userData?.phone}
                    placeholder={userData?.phone}
                />
            </div>

    );
}

export default PhoneValidation;
