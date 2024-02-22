// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Define a type for the country object
// type Country = {
//   iso2: string;
//   iso3: string;
//   country: string;
//   cities: string[]; // Change to cities for states
// };

// interface SelectCountryProps {
//   formData: {
//     departCountry: string;
//     departState: string;
//     destCountry: string;
//     desState: string;
//     departDate: string;
//     arrivDate: string;
//     maxWeight: string;
//     description: string;
//     transporterId: string;
//   };
//   handleInput: (name: string, event: any) => void;
// }

// const SelectCountry: React.FC<SelectCountryProps> = ({
//   handleInput,
//   formData,
// }) => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDepartureCountry, setSelectedDepartureCountry] =
//     useState<string>(formData.departCountry);
//   const [selectedDepartureState, setSelectedDepartureState] = useState<string>(
//     formData.departState,
//   );
//   const [selectedDestinationCountry, setSelectedDestinationCountry] =
//     useState<string>(formData.destCountry);
//   const [selectedDestinationState, setSelectedDestinationState] =
//     useState<string>(formData.desState);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get(
//           "https://countriesnow.space/api/v0.1/countries",
//         );
//         const data: Country[] = response.data.data;
//         setCountries(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     setSelectedDepartureCountry(formData.departCountry);
//     setSelectedDepartureState(formData.departState);
//     setSelectedDestinationCountry(formData.destCountry);
//     setSelectedDestinationState(formData.desState);
//   }, [formData]);

//   useEffect(() => {
//     // Find the selected country object based on its name
//     const selectedCountry = countries.find(
//       (country) => country.country === selectedDepartureCountry,
//     );

//     // If the selected country is found and it has cities (states)
//     if (selectedCountry && selectedCountry.cities.length > 0) {
//       // Set the first state of the selected country as the selected departure state
//       setSelectedDepartureState(selectedCountry.cities[0]);
//       // Update the form data with the selected departure state
//       handleInput("departState", selectedCountry.cities[0]);
//     } else {
//       // If no states are available, reset the selected departure state
//       setSelectedDepartureState("");
//       // Update the form data with an empty string for the departure state
//       handleInput("departState", "");
//     }
//   }, [selectedDepartureCountry, countries]);

//   useEffect(() => {
//     // Find the selected country object based on its name
//     const selectedCountry = countries.find(
//       (country) => country.country === selectedDestinationCountry,
//     );

//     // If the selected country is found and it has cities (states)
//     if (selectedCountry && selectedCountry.cities.length > 0) {
//       // Set the first state of the selected country as the selected destination state
//       setSelectedDestinationState(selectedCountry.cities[0]);
//       // Update the form data with the selected destination state
//       handleInput("desState", selectedCountry.cities[0]);
//     } else {
//       // If no states are available, reset the selected destination state
//       setSelectedDestinationState("");
//       // Update the form data with an empty string for the destination state
//       handleInput("desState", "");
//     }
//   }, [selectedDestinationCountry, countries]);

//   // Function to handle country selection for departure
//   const handleDepartureCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDepartureCountry(e.target.value);
//     // Reset selected state when a new country is selected
//     setSelectedDepartureState("");
//     handleInput("departCountry", e.target.value);
//   };

//   // Function to handle state selection for departure
//   const handleDepartureStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDepartureState(e.target.value);
//     handleInput("departState", e.target.value);
//   };

//   // Function to handle country selection for destination
//   const handleDestinationCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDestinationCountry(e.target.value);
//     // Reset selected state when a new country is selected
//     setSelectedDestinationState("");
//     handleInput("destCountry", e.target.value);
//   };

//   // Function to handle state selection for destination
//   const handleDestinationStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDestinationState(e.target.value);
//     handleInput("desState", e.target.value);
//   };

//   return (
//     <>
//       <div>
//         <label
//           htmlFor="departure"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Departure
//         </label>
//         <select
//           id="departure"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           onChange={handleDepartureCountryChange}
//           value={selectedDepartureCountry}
//           required
//         >
//           <option value="" disabled>
//             {loading ? "Loading countries..." : "Choose a country"}
//           </option>
//           {countries.map((country, index) => (
//             <option key={index} value={country.country}>
//               {country.country}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label
//           htmlFor="departureState"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Departure State
//         </label>
//         <select
//           id="departureState"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           value={selectedDepartureState}
//           required
//           disabled={!selectedDepartureCountry}
//           onChange={handleDepartureStateChange}
//         >
//           <option value="" disabled>
//             {selectedDepartureCountry
//               ? "Choose a state"
//               : "Select a country first"}
//           </option>
//           {selectedDepartureCountry &&
//             countries
//               .find((country) => country.country === selectedDepartureCountry)
//               ?.cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//         </select>
//       </div>

//       {/* Destination */}
//       <div>
//         <label
//           htmlFor="destination"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Destination
//         </label>
//         <select
//           id="destination"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           onChange={handleDestinationCountryChange}
//           value={selectedDestinationCountry}
//           required
//         >
//           <option value="" disabled>
//             {loading ? "Loading countries..." : "Choose a country"}
//           </option>
//           {countries.map((country, index) => (
//             <option key={index} value={country.country}>
//               {country.country}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label
//           htmlFor="destinationState"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Destination State
//         </label>
//         <select
//           id="destinationState"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           value={selectedDestinationState}
//           required
//           disabled={!selectedDestinationCountry}
//           onChange={handleDestinationStateChange}
//         >
//           <option value="" disabled>
//             {selectedDestinationCountry
//               ? "Choose a state"
//               : "Select a country first"}
//           </option>
//           {selectedDestinationCountry &&
//             countries
//               .find((country) => country.country === selectedDestinationCountry)
//               ?.cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//         </select>
//       </div>
//     </>
//   );
// };

// export default SelectCountry;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Define a type for the country object
// type Country = {
//   iso2: string;
//   iso3: string;
//   country: string;
//   cities: string[]; // Change to cities for states
// };

// interface SelectCountryProps {
//   formData: {
//     departCountry: string;
//     departState: string;
//     destCountry: string;
//     desState: string;
//     departDate: string;
//     arrivDate: string;
//     maxWeight: string;
//     description: string;
//     transporterId: string;
//   };
//   handleInput: (name: string, event: any) => void;
// }

// const SelectCountry: React.FC<SelectCountryProps> = ({
//   handleInput,
//   formData,
// }) => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDepartureCountry, setSelectedDepartureCountry] =
//     useState<string>(formData.departCountry);
//   const [selectedDepartureState, setSelectedDepartureState] = useState<string>(
//     formData.departState,
//   );
//   const [selectedDestinationCountry, setSelectedDestinationCountry] =
//     useState<string>(formData.destCountry);
//   const [selectedDestinationState, setSelectedDestinationState] =
//     useState<string>(formData.desState);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get(
//           "https://countriesnow.space/api/v0.1/countries",
//         );
//         const data: Country[] = response.data.data;
//         setCountries(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     setSelectedDepartureCountry(formData.departCountry);
//     setSelectedDepartureState(formData.departState);
//     setSelectedDestinationCountry(formData.destCountry);
//     setSelectedDestinationState(formData.desState);
//   }, [formData]);

//   // Function to handle country selection for departure
//   const handleDepartureCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     const selectedCountry = e.target.value;
//     setSelectedDepartureCountry(selectedCountry);
//     // Reset selected state when a new country is selected
//     setSelectedDepartureState("");
//     handleInput("departCountry", selectedCountry);

//     // Update the departure state based on the selected country
//     const selectedCountryData = countries.find(
//       (country) => country.country === selectedCountry,
//     );
//     if (selectedCountryData?.cities.length > 0) {
//       setSelectedDepartureState(selectedCountryData.cities[0]);
//       handleInput("departState", selectedCountryData.cities[0]);
//     }
//   };

//   // Function to handle state selection for departure
//   const handleDepartureStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDepartureState(e.target.value);
//     handleInput("departState", e.target.value);
//   };

//   // Function to handle country selection for destination
//   const handleDestinationCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     const selectedCountry = e.target.value;
//     setSelectedDestinationCountry(selectedCountry);
//     // Reset selected state when a new country is selected
//     setSelectedDestinationState("");
//     handleInput("destCountry", selectedCountry);

//     // Update the destination state based on the selected country
//     const selectedCountryData = countries.find(
//       (country) => country.country === selectedCountry,
//     );
//     if (selectedCountryData?.cities.length > 0) {
//       setSelectedDestinationState(selectedCountryData.cities[0]);
//       handleInput("desState", selectedCountryData.cities[0]);
//     }
//   };

//   // Function to handle state selection for destination
//   const handleDestinationStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDestinationState(e.target.value);
//     handleInput("desState", e.target.value);
//   };

//   return (
//     <>
//       <div>
//         <label
//           htmlFor="departure"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Departure
//         </label>
//         <select
//           id="departure"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           onChange={handleDepartureCountryChange}
//           value={selectedDepartureCountry}
//           required
//         >
//           <option value="" disabled>
//             {loading ? "Loading countries..." : "Choose a country"}
//           </option>
//           {countries.map((country, index) => (
//             <option key={index} value={country.country}>
//               {country.country}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label
//           htmlFor="departureState"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Departure State
//         </label>
//         <select
//           id="departureState"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           value={selectedDepartureState}
//           required
//           disabled={!selectedDepartureCountry}
//           onChange={handleDepartureStateChange}
//         >
//           <option value="">
//             {selectedDepartureState ? selectedDepartureState : "Current state"}
//           </option>
//           {selectedDepartureCountry &&
//             countries
//               .find((country) => country.country === selectedDepartureCountry)
//               ?.cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//         </select>
//       </div>

//       {/* Destination */}
//       <div>
//         <label
//           htmlFor="destination"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Destination
//         </label>
//         <select
//           id="destination"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           onChange={handleDestinationCountryChange}
//           value={selectedDestinationCountry}
//           required
//         >
//           <option value="" disabled>
//             {loading ? "Loading countries..." : "Choose a country"}
//           </option>
//           {countries.map((country, index) => (
//             <option key={index} value={country.country}>
//               {country.country}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label
//           htmlFor="destinationState"
//           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//         >
//           Destination State
//         </label>
//         <select
//           id="destinationState"
//           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           value={selectedDestinationState}
//           required
//           disabled={!selectedDestinationCountry}
//           onChange={handleDestinationStateChange}
//         >
//           <option value="">
//             {selectedDestinationState
//               ? selectedDestinationState
//               : "Current state"}
//           </option>
//           {selectedDestinationCountry &&
//             countries
//               .find((country) => country.country === selectedDestinationCountry)
//               ?.cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//         </select>
//       </div>
//     </>
//   );
// };

// export default SelectCountry;
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define a type for the country object
type Country = {
  iso2: string;
  iso3: string;
  country: string;
  cities: string[]; // Change to cities for states
};

interface SelectCountryProps {
  formData: {
    departCountry: string;
    departState: string;
    destCountry: string;
    desState: string;
    departDate: string;
    arrivDate: string;
    maxWeight: string;
    description: string;
    transporterId: string;
  };
  handleInput: (name: string, event: any) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
  handleInput,
  formData,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartureCountry, setSelectedDepartureCountry] =
    useState<string>(formData.departCountry);
  const [selectedDepartureState, setSelectedDepartureState] = useState<string>(
    formData.departState,
  );
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState<string>(formData.destCountry);
  const [selectedDestinationState, setSelectedDestinationState] =
    useState<string>(formData.desState);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries",
        );
        const data: Country[] = response.data.data;
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setSelectedDepartureCountry(formData.departCountry);
    setSelectedDepartureState(formData.departState);
    setSelectedDestinationCountry(formData.destCountry);
    setSelectedDestinationState(formData.desState);
  }, [formData]);

  // Function to handle country selection for departure
  const handleDepartureCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCountry = e.target.value;
    setSelectedDepartureCountry(selectedCountry);
    // Reset selected state when a new country is selected
    setSelectedDepartureState("");
    handleInput("departCountry", selectedCountry);

    // Update the departure state based on the selected country
    const selectedCountryData = countries.find(
      (country) => country.country === selectedCountry,
    );
    if (selectedCountryData && selectedCountryData?.cities?.length > 0) {
      setSelectedDepartureState(selectedCountryData?.cities[0] ?? "");
      handleInput("departState", selectedCountryData?.cities[0] ?? "");
    }
  };

  // Function to handle state selection for departure
  const handleDepartureStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDepartureState(e.target.value);
    handleInput("departState", e.target.value);
  };

  // Function to handle country selection for destination
  const handleDestinationCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCountry = e.target.value;
    setSelectedDestinationCountry(selectedCountry);
    // Reset selected state when a new country is selected
    setSelectedDestinationState("");
    handleInput("destCountry", selectedCountry);

    // Update the destination state based on the selected country
    const selectedCountryData = countries.find(
      (country) => country.country === selectedCountry,
    );
    if (selectedCountryData && selectedCountryData?.cities?.length > 0) {
      setSelectedDestinationState(selectedCountryData?.cities[0] ?? "");
      handleInput("desState", selectedCountryData?.cities[0] ?? "");
    }
  };

  // Function to handle state selection for destination
  const handleDestinationStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDestinationState(e.target.value);
    handleInput("desState", e.target.value);
  };

  return (
    <>
      <div>
        <label
          htmlFor="departure"
          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
        >
          Departure
        </label>
        <select
          id="departure"
          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={handleDepartureCountryChange}
          value={selectedDepartureCountry}
          required
        >
          <option value="" disabled>
            {loading ? "Loading countries..." : "Choose a country"}
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="departureState"
          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
        >
          Departure State
        </label>
        <select
          id="departureState"
          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={selectedDepartureState}
          required
          disabled={!selectedDepartureCountry}
          onChange={handleDepartureStateChange}
        >
          <option value="">
            {selectedDepartureState ? selectedDepartureState : "Current state"}
          </option>
          {selectedDepartureCountry &&
            countries
              .find((country) => country.country === selectedDepartureCountry)
              ?.cities?.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
        </select>
      </div>

      {/* Destination */}
      <div>
        <label
          htmlFor="destination"
          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
        >
          Destination
        </label>
        <select
          id="destination"
          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={handleDestinationCountryChange}
          value={selectedDestinationCountry}
          required
        >
          <option value="" disabled>
            {loading ? "Loading countries..." : "Choose a country"}
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="destinationState"
          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
        >
          Destination State
        </label>
        <select
          id="destinationState"
          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={selectedDestinationState}
          required
          disabled={!selectedDestinationCountry}
          onChange={handleDestinationStateChange}
        >
          <option value="">
            {selectedDestinationState
              ? selectedDestinationState
              : "Current state"}
          </option>
          {selectedDestinationCountry &&
            countries
              .find((country) => country.country === selectedDestinationCountry)
              ?.cities?.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
        </select>
      </div>
    </>
  );
};

export default SelectCountry;
