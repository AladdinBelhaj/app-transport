import React, { useState } from "react";

interface PasswordValidationProps {
  handleInput: (name: string, event: any) => void;
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  handleInput,
  setFormValid,
}) => {
  const [password, setPassword] = useState("");

  const handleInputValidation = (field: any, value: any) => {
    if (field === "password") {
      setPassword(value);
      if (value.length < 6) {
        setFormValid(false);
        setPassword("Password must contain at least 6 characters");
      } else {
        setFormValid(true);
        setPassword("");
      }
    }
  };

  return (
    <div className="relative mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Password
      </label>
      {password && (
        <p className="text-red-500 absolute right-0 top-0 mt-1">{password}</p>
      )}
      <div className="relative">
        <input
          type="password"
          name="password"
          onChange={(e) => {
            handleInput("password", e.target.value); // Adjusted to pass correct field name
            handleInputValidation("password", e.target.value); // Adjusted to pass correct field name
          }}
          placeholder="Enter your password"
          className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${password && "border-red-500"}`}
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
                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                fill=""
              />
              <path
                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                fill=""
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default PasswordValidation;

// import React, { useState } from "react";

// interface PasswordValidationProps {
//   handleInput: (name: string, event: any) => void;
//   setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const PasswordValidation: React.FC<PasswordValidationProps> = ({
//   handleInput,
//   setFormValid,
// }) => {
//   const [password, setPassword] = useState("");

//   const handleInputValidation = (field: any, value: any) => {
//     if (field === "password") {
//       setPassword(value);
//       if (value.length < 6) {
//         setFormValid(false); // Set formValid to false if validation fails
//       } else {
//         setFormValid(true); // Set formValid to true if validation passes
//       }
//     }
//   };

//   return (
//     <div className="relative mb-4">
//       <label className="mb-2.5 block font-medium text-black dark:text-white">
//         Password
//       </label>
//       <div className="relative">
//         <input
//           type="password"
//           name="password"
//           onChange={(e) => {
//             handleInput("password", e.target.value);
//             handleInputValidation("password", e.target.value);
//           }}
//           placeholder="Enter your password"
//           className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
//             password.length < 6 && "border-red-500"
//           }`}
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
//                 d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
//                 fill=""
//               />
//               <path
//                 d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
//                 fill=""
//               />
//             </g>
//           </svg>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default PasswordValidation;
