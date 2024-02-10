// import React, { useState } from "react";

// interface NameValidationProps {
//   handleInput: (name: string, event: any) => void;
// }

// const NameValidation: React.FC<NameValidationProps> = ({ handleInput }) => {
//   const [fullName, setFullName] = useState("");
//   const [fullNameError, setFullNameError] = useState("");

//   const handleInputValidation = (field: any, value: any) => {
//     if (field === "fullname") {
//       setFullName(value);
//       if (!/\s/.test(value)) {
//         setFullNameError("Please enter your full name");
//       } else {
//         setFullNameError("");
//       }
//     }
//   };

//   return (
//     <div className="relative mb-4">
//       <label className="mb-2.5 block font-medium text-black dark:text-white">
//         Name
//       </label>
//       {fullNameError && (
//         <p className="text-red-500 absolute right-0 top-0 mt-1">
//           {fullNameError}
//         </p>
//       )}
//       <div className="relative">
//         <input
//           type="text"
//           onChange={(e) => {
//             handleInput("fullname", e.target.value);
//             handleInputValidation("fullname", e.target.value);
//           }}
//           name="fullname"
//           placeholder="Enter your full name"
//           className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${fullNameError && "border-red-500"}`}
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
//                 d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
//                 fill=""
//               />
//               <path
//                 d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
//                 fill=""
//               />
//             </g>
//           </svg>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default NameValidation;

import React, { useState } from "react";

interface NameValidationProps {
  handleInput: (name: string, event: any) => void;
  setNameValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const NameValidation: React.FC<NameValidationProps> = ({
  handleInput,
  setNameValid,
}) => {
  const [fullName, setFullName] = useState("");

  const handleInputValidation = (field: any, value: any) => {
    if (field === "fullname") {
      setFullName(value);
      if (!/\s/.test(value)) {
        setNameValid(false); // Set formValid to false if validation fails
        setFullName("Please enter your full name");
      } else {
        setNameValid(true); // Set formValid to true if validation passes
        setFullName("");
      }
    }
  };

  return (
    <div className="relative mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Name
      </label>
      {fullName && (
        <p className="text-red-500 absolute right-0 top-0 mt-1">{fullName}</p>
      )}
      <div className="relative">
        <input
          type="text"
          onChange={(e) => {
            handleInput("fullname", e.target.value);
            handleInputValidation("fullname", e.target.value);
          }}
          name="fullname"
          placeholder="Enter your full name"
          className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
            !/\s/.test(fullName) && "border-red-500"
          }`}
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
                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                fill=""
              />
              <path
                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                fill=""
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default NameValidation;
