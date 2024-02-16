import React, { useState } from "react";

interface UserData {
  fullname?: string;
  email?: string;
  username?: string;
  phone?: string;
  bio?: string;
}

interface EmailProps {
  userData: UserData | null; // Allow null values
}

const Email: React.FC<EmailProps> = ({ userData }) => {
  return (
    <div className="mb-5.5">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="email"
      >
        Email Address
      </label>
      <div className="relative">
        <span className="absolute left-4.5 top-4">
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                fill=""
              />
            </g>
          </svg>
        </span>
        <input
          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="email"
          name="email"
          id="email"
          readOnly
          defaultValue={userData?.email}
          placeholder={userData?.email}
          disabled // Add the disabled attribute to ensure the input is disabled
          style={{
            backgroundColor: "#f4f4f4", // Change the background color to a lighter shade
            borderColor: "#d1d1d1", // Change the border color
            cursor: "not-allowed", // Change the cursor style
          }}
        />
      </div>
    </div>
  );
};

export default Email;
