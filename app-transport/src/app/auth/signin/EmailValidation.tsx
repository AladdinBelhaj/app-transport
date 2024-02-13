// import React, { useState } from "react";

// interface EmailValidationProps {
//   handleInput: (name: string, event: any) => void;
//   setEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const EmailValidation: React.FC<EmailValidationProps> = ({
//   handleInput,
//   setEmailValid,
// }) => {
//   const [emailError, setEmailError] = useState("");

//   const handleInputValidation = (field: any, value: any) => {
//     if (field === "email") {
//       const emailRegex =
//         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//       if (!emailRegex.test(value)) {
//         setEmailValid(false);
//         setEmailError("Please enter a valid email");
//       } else {
//         setEmailValid(true);
//         setEmailError("");
//       }
//     }
//   };

//   return (
//     <div className="relative mb-4">
//       <label className="mb-2.5 block font-medium text-black dark:text-white">
//         Email
//       </label>
//       {emailError && (
//         <p className="text-red-500 absolute right-0 top-0 mt-1">{emailError}</p>
//       )}
//       <div className="relative">
//         <input
//           type="email"
//           onChange={(e) => {
//             handleInput("email", e.target.value);
//             handleInputValidation("email", e.target.value);
//           }}
//           name="email"
//           placeholder="Enter your email"
//           className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${emailError && "border-red-500"}`}
//         />
//         <span className="absolute right-4 top-4">
//           <svg
//             className="fill-current"
//             width="22"
//             height="22"
//             viewBox="0 0 22 22"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g opacity="0.5">
//               <path
//                 d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
//                 fill=""
//               />
//             </g>
//           </svg>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default EmailValidation;

import React, { useState } from "react";

interface EmailValidationProps {
  handleInput: (name: string, event: any) => void;
  setEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailValidation: React.FC<EmailValidationProps> = ({
  handleInput,
  setEmailValid,
}) => {
  const [emailError, setEmailError] = useState("");

  const handleInputValidation = (field: any, value: any) => {
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setEmailValid(false);
        setEmailError("Please enter a valid email address");
      } else {
        setEmailValid(true);
        setEmailError("");
      }
    }
  };

  return (
    <div className="relative mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Email
      </label>
      {emailError && (
        <p style={{ color: "red" }} className="absolute right-0 top-0 mt-1">
          {emailError}
        </p>
      )}
      <div className="relative">
        <input
          type="email"
          onChange={(e) => {
            handleInput("email", e.target.value);
            handleInputValidation("email", e.target.value);
          }}
          name="email"
          placeholder="Enter your email"
          className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${emailError && "border-red-500"}`}
        />
        <span className="absolute right-4 top-4">
          <svg
            className="fill-current"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                fill=""
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default EmailValidation;
