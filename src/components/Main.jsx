import { useEffect, useState } from "react";

function Main() {
  const [countries, setCountries] = useState([]);

useEffect(() => {
  async function fetchCountries() {
    try {
      const response = await fetch(
        "https://openholidaysapi.org/Countries?languageIsoCode=EN"
      );
      const json = await response.json();
      console.log("Fetched countries:", json); // Debugging log
      setCountries(json || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  fetchCountries();
}, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
      <form>
        <select
          defaultValue=""
          className="p-2 text-black bg-white border border-gray-400"
        >
          <option value="">--Select Country--</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name[0]?.text ?? "Unknown"}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default Main;
