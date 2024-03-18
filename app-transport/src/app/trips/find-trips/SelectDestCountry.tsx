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
  selectedCountry: string; // Prop for passing the selected country value
  onCountryChange: (country: string) => void; // Prop for handling country change
}

const SelectDestCountry: React.FC<SelectCountryProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDestinationCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCountry = e.target.value;
    onCountryChange(selectedCountry); // Pass the selected country to the parent component
  };

  return (
    <>
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
          value={selectedCountry}
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
    </>
  );
};

export default SelectDestCountry;
