import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://openholidaysapi.org/Countries?languageIsoCode=EN"
        );
        const json = await response.json();

        console.log("Fetched countries:", JSON.stringify(json, null, 2)); // Debugging

        if (!Array.isArray(json)) {
          console.error("API did not return an array:", json);
          return;
        }

        setCountries(json);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
      <form>
        {loading ? (
          <p>Loading countries...</p>
        ) : (
          <select
            defaultValue=""
            className="p-2 text-black bg-white border border-gray-400"
          >
            <option value="">--Select Country--</option>
            {countries.length > 0 ? (
              countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name?.[0]?.text || "Unnamed Country"}
                </option>
              ))
            ) : (
              <option disabled>No countries available</option>
            )}
          </select>
        )}
      </form>
      <div></div>
    </div>
  );
}

export default App;
