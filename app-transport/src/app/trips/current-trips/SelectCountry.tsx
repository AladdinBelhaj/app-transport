// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // // Define a type for the country object
// // type Country = {
// //   iso2: string;
// //   iso3: string;
// //   country: string;
// //   cities: string[]; // Change to cities for states
// // };

// // const SelectCountry = () => {
// //   const [countries, setCountries] = useState<Country[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedCountry, setSelectedCountry] = useState<string>("");
// //   const [selectedState, setSelectedState] = useState<string>("");

// //   useEffect(() => {
// //     const fetchCountries = async () => {
// //       try {
// //         const response = await axios.get(
// //           "https://countriesnow.space/api/v0.1/countries",
// //         );
// //         const data: Country[] = response.data.data;
// //         setCountries(data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching countries:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchCountries();
// //   }, []);

// //   // Function to handle country selection
// //   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setSelectedCountry(e.target.value);
// //     // Reset selected state when a new country is selected
// //     setSelectedState("");
// //   };

// //   // Function to handle state selection
// //   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setSelectedState(e.target.value);
// //   };

// //   return (
// //     <>
// //       <div>
// //         <label
// //           htmlFor="departure"
// //           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
// //         >
// //           Departure
// //         </label>
// //         <select
// //           id="departure"
// //           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
// //           onChange={handleCountryChange}
// //           required
// //         >
// //           <option value="" disabled selected>
// //             {loading ? "Loading countries..." : "Choose a country"}
// //           </option>
// //           {countries.map((country) => (
// //             <option key={country.iso2} value={country.iso2}>
// //               {country.country}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //       <div>
// //         <label
// //           htmlFor="departureState"
// //           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
// //         >
// //           Departure State
// //         </label>
// //         <select
// //           id="departureState"
// //           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
// //           required
// //           disabled={!selectedCountry}
// //           onChange={handleStateChange}
// //         >
// //           <option value="" disabled selected={!selectedCountry}>
// //             {selectedCountry ? "Choose a state" : "Select a country first"}
// //           </option>
// //           {selectedCountry &&
// //             countries
// //               .find((country) => country.iso2 === selectedCountry)
// //               ?.cities.map((city) => (
// //                 <option key={city} value={city}>
// //                   {city}
// //                 </option>
// //               ))}
// //         </select>
// //       </div>
// //     </>
// //   );
// // };

// // export default SelectCountry;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // // Define a type for the country object
// // type Country = {
// //   iso2: string;
// //   iso3: string;
// //   country: string;
// //   cities: string[]; // Change to cities for states
// // };

// // interface SelectCountryProps {
// //   handleInput: (name: string, event: any) => void;
// // }

// // const SelectCountry: React.FC<SelectCountryProps> = ({ handleInput }) => {
// //   const [countries, setCountries] = useState<Country[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedDepartureCountry, setSelectedDepartureCountry] =
// //     useState<string>("");
// //   const [selectedDepartureState, setSelectedDepartureState] =
// //     useState<string>("");
// //   const [selectedDestinationCountry, setSelectedDestinationCountry] =
// //     useState<string>("");
// //   const [selectedDestinationState, setSelectedDestinationState] =
// //     useState<string>("");

// //   useEffect(() => {
// //     const fetchCountries = async () => {
// //       try {
// //         const response = await axios.get(
// //           "https://countriesnow.space/api/v0.1/countries",
// //         );
// //         const data: Country[] = response.data.data;
// //         setCountries(data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching countries:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchCountries();
// //   }, []);

// //   // Function to handle country selection for departure
// //   const handleDepartureCountryChange = (
// //     e: React.ChangeEvent<HTMLSelectElement>,
// //   ) => {
// //     setSelectedDepartureCountry(e.target.value);
// //     // Reset selected state when a new country is selected
// //     setSelectedDepartureState("");
// //   };

// //   // Function to handle state selection for departure
// //   const handleDepartureStateChange = (
// //     e: React.ChangeEvent<HTMLSelectElement>,
// //   ) => {
// //     setSelectedDepartureState(e.target.value);
// //   };

// //   // Function to handle country selection for destination
// //   const handleDestinationCountryChange = (
// //     e: React.ChangeEvent<HTMLSelectElement>,
// //   ) => {
// //     setSelectedDestinationCountry(e.target.value);
// //     // Reset selected state when a new country is selected
// //     setSelectedDestinationState("");
// //   };

// //   // Function to handle state selection for destination
// //   const handleDestinationStateChange = (
// //     e: React.ChangeEvent<HTMLSelectElement>,
// //   ) => {
// //     setSelectedDestinationState(e.target.value);
// //   };

// //   return (
// //     <>
// //       <div>
// //         <label
// //           htmlFor="departure"
// //           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
// //         >
// //           Departure
// //         </label>
// //         <select
// //           id="departure"
// //           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
// //           onChange={(e) => {
// //             handleDepartureCountryChange(e);
// //             handleInput("departCountry", e.target.value);
// //           }}
// //           required
// //         >
// //           <option value="" disabled selected>
// //             {loading ? "Loading countries..." : "Choose a country"}
// //           </option>
// //           {countries.map((country) => (
// //             <option key={country.iso2} value={country.iso2}>
// //               {country.country}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //       <div>
// //         <label
// //           htmlFor="departureState"
// //           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
// //         >
// //           Departure State
// //         </label>
// //         <select
// //           id="departureState"
// //           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
// //           required
// //           disabled={!selectedDepartureCountry}
// //           onChange={(e) => {
// //             handleDepartureStateChange(e);
// //             handleInput("departState", e.target.value);
// //           }}
// //         >
// //           <option value="" disabled selected={!selectedDepartureCountry}>
// //             {selectedDepartureCountry
// //               ? "Choose a state"
// //               : "Select a country first"}
// //           </option>
// //           {selectedDepartureCountry &&
// //             countries
// //               .find((country) => country.iso2 === selectedDepartureCountry)
// //               ?.cities.map((city) => (
// //                 <option key={city} value={city}>
// //                   {city}
// //                 </option>
// //               ))}
// //         </select>
// //       </div>

// //       {/* Destination */}
// //       <div>
// //         <label
// //           htmlFor="destination"
// //           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
// //         >
// //           Destination
// //         </label>
// //         <select
// //           id="destination"
// //           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
// //           onChange={(e) => {
// //             handleDestinationCountryChange(e);
// //             handleInput("destCountry", e.target.value);
// //           }}
// //           required
// //         >
// //           <option value="" disabled selected>
// //             {loading ? "Loading countries..." : "Choose a country"}
// //           </option>
// //           {countries.map((country) => (
// //             <option key={country.iso2} value={country.iso2}>
// //               {country.country}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //       <div>
// //         <label
// //           htmlFor="destinationState"
// //           className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
// //         >
// //           Destination State
// //         </label>
// //         <select
// //           id="destinationState"
// //           className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
// //           required
// //           disabled={!selectedDestinationCountry}
// //           onChange={(e) => {
// //             handleDestinationStateChange(e);
// //             handleInput("desState", e.target.value);
// //           }}
// //         >
// //           <option value="" disabled selected={!selectedDestinationCountry}>
// //             {selectedDestinationCountry
// //               ? "Choose a state"
// //               : "Select a country first"}
// //           </option>
// //           {selectedDestinationCountry &&
// //             countries
// //               .find((country) => country.iso2 === selectedDestinationCountry)
// //               ?.cities.map((city) => (
// //                 <option key={city} value={city}>
// //                   {city}
// //                 </option>
// //               ))}
// //         </select>
// //       </div>
// //     </>
// //   );
// // };

// // export default SelectCountry;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Define a type for the country object
// type Country = {
//   iso2: string;
//   iso3: string;
//   country: string;
//   cities: string[]; // Change to cities for states
// };

// interface TripSingle {
//   id: number;
//   departCountry: string;
//   departState: string;
//   destCountry: string;
//   desState: string;
//   departDate: Date;
//   arrivDate: Date;
//   maxWeight: string;
//   description: string;
//   transporterId: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface SelectCountryProps {
//   handleInput: (name: string, event: any) => void;
//   tripData: TripSingle | null;
// }

// const SelectCountry: React.FC<SelectCountryProps> = ({
//   handleInput,
//   tripData,
// }) => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDepartureCountry, setSelectedDepartureCountry] =
//     useState<string>(tripData?.departCountry ?? "");
//   const [selectedDepartureState, setSelectedDepartureState] = useState<string>(
//     tripData?.departState ?? "",
//   );
//   const [selectedDestinationCountry, setSelectedDestinationCountry] =
//     useState<string>(tripData?.destCountry ?? "");
//   const [selectedDestinationState, setSelectedDestinationState] =
//     useState<string>(tripData?.desState ?? "");

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

//   // Function to handle country selection for departure
//   const handleDepartureCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDepartureCountry(e.target.value);
//     // Reset selected state when a new country is selected
//     setSelectedDepartureState("");
//     handleInput("departCountry", e.target.value); // Pass country to handleInput
//   };

//   // Function to handle state selection for departure
//   const handleDepartureStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDepartureState(e.target.value);
//     handleInput("departState", e.target.value); // Pass state to handleInput
//   };

//   // Function to handle country selection for destination
//   const handleDestinationCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDestinationCountry(e.target.value);
//     // Reset selected state when a new country is selected
//     setSelectedDestinationState("");
//     handleInput("destCountry", e.target.value); // Pass country to handleInput
//   };

//   // Function to handle state selection for destination
//   const handleDestinationStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDestinationState(e.target.value);
//     handleInput("desState", e.target.value); // Pass state to handleInput
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

// const SelectCountry = () => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCountry, setSelectedCountry] = useState<string>("");
//   const [selectedState, setSelectedState] = useState<string>("");

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

//   // Function to handle country selection
//   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCountry(e.target.value);
//     // Reset selected state when a new country is selected
//     setSelectedState("");
//   };

//   // Function to handle state selection
//   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedState(e.target.value);
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
//           onChange={handleCountryChange}
//           required
//         >
//           <option value="" disabled selected>
//             {loading ? "Loading countries..." : "Choose a country"}
//           </option>
//           {countries.map((country) => (
//             <option key={country.iso2} value={country.iso2}>
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
//           required
//           disabled={!selectedCountry}
//           onChange={handleStateChange}
//         >
//           <option value="" disabled selected={!selectedCountry}>
//             {selectedCountry ? "Choose a state" : "Select a country first"}
//           </option>
//           {selectedCountry &&
//             countries
//               .find((country) => country.iso2 === selectedCountry)
//               ?.cities.map((city) => (
//                 <option key={city} value={city}>
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
//   handleInput: (name: string, event: any) => void;
// }

// const SelectCountry: React.FC<SelectCountryProps> = ({ handleInput }) => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDepartureCountry, setSelectedDepartureCountry] =
//     useState<string>("");
//   const [selectedDepartureState, setSelectedDepartureState] =
//     useState<string>("");
//   const [selectedDestinationCountry, setSelectedDestinationCountry] =
//     useState<string>("");
//   const [selectedDestinationState, setSelectedDestinationState] =
//     useState<string>("");

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

//   // Function to handle country selection for departure
//   const handleDepartureCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDepartureCountry(e.target.value);
//     // Reset selected state when a new country is selected
//     setSelectedDepartureState("");
//   };

//   // Function to handle state selection for departure
//   const handleDepartureStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDepartureState(e.target.value);
//   };

//   // Function to handle country selection for destination
//   const handleDestinationCountryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDestinationCountry(e.target.value);
//     // Reset selected state when a new country is selected
//     setSelectedDestinationState("");
//   };

//   // Function to handle state selection for destination
//   const handleDestinationStateChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setSelectedDestinationState(e.target.value);
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
//           onChange={(e) => {
//             handleDepartureCountryChange(e);
//             handleInput("departCountry", e.target.value);
//           }}
//           required
//         >
//           <option value="" disabled selected>
//             {loading ? "Loading countries..." : "Choose a country"}
//           </option>
//           {countries.map((country) => (
//             <option key={country.iso2} value={country.iso2}>
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
//           required
//           disabled={!selectedDepartureCountry}
//           onChange={(e) => {
//             handleDepartureStateChange(e);
//             handleInput("departState", e.target.value);
//           }}
//         >
//           <option value="" disabled selected={!selectedDepartureCountry}>
//             {selectedDepartureCountry
//               ? "Choose a state"
//               : "Select a country first"}
//           </option>
//           {selectedDepartureCountry &&
//             countries
//               .find((country) => country.iso2 === selectedDepartureCountry)
//               ?.cities.map((city) => (
//                 <option key={city} value={city}>
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
//           onChange={(e) => {
//             handleDestinationCountryChange(e);
//             handleInput("destCountry", e.target.value);
//           }}
//           required
//         >
//           <option value="" disabled selected>
//             {loading ? "Loading countries..." : "Choose a country"}
//           </option>
//           {countries.map((country) => (
//             <option key={country.iso2} value={country.iso2}>
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
//           required
//           disabled={!selectedDestinationCountry}
//           onChange={(e) => {
//             handleDestinationStateChange(e);
//             handleInput("desState", e.target.value);
//           }}
//         >
//           <option value="" disabled selected={!selectedDestinationCountry}>
//             {selectedDestinationCountry
//               ? "Choose a state"
//               : "Select a country first"}
//           </option>
//           {selectedDestinationCountry &&
//             countries
//               .find((country) => country.iso2 === selectedDestinationCountry)
//               ?.cities.map((city) => (
//                 <option key={city} value={city}>
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

interface TripSingle {
  id: number;
  departCountry: string;
  departState: string;
  destCountry: string;
  desState: string;
  departDate: Date;
  arrivDate: Date;
  maxWeight: string;
  description: string;
  transporterId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface SelectCountryProps {}

const SelectCountry: React.FC<SelectCountryProps> = ({}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartureCountry, setSelectedDepartureCountry] =
    useState<string>();
  const [selectedDepartureState, setSelectedDepartureState] =
    useState<string>();
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState<string>();
  const [selectedDestinationState, setSelectedDestinationState] =
    useState<string>();

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

  // Function to handle country selection for departure
  const handleDepartureCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDepartureCountry(e.target.value);
    // Reset selected state when a new country is selected
    setSelectedDepartureState("");
  };

  // Function to handle state selection for departure
  const handleDepartureStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDepartureState(e.target.value);
  };

  // Function to handle country selection for destination
  const handleDestinationCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDestinationCountry(e.target.value);
    // Reset selected state when a new country is selected
    setSelectedDestinationState("");
  };

  // Function to handle state selection for destination
  const handleDestinationStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDestinationState(e.target.value);
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
          <option value="" disabled>
            {selectedDepartureCountry
              ? "Choose a state"
              : "Select a country first"}
          </option>
          {selectedDepartureCountry &&
            countries
              .find((country) => country.country === selectedDepartureCountry)
              ?.cities.map((city, index) => (
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
          <option value="" disabled>
            {selectedDestinationCountry
              ? "Choose a state"
              : "Select a country first"}
          </option>
          {selectedDestinationCountry &&
            countries
              .find((country) => country.country === selectedDestinationCountry)
              ?.cities.map((city, index) => (
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
