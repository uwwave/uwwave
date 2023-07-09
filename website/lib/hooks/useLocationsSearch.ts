import { useState, useMemo } from "react";
import { Country, City } from "country-state-city";

interface ILocation {
  city: string;
  state: string;
  country: string;
}
export const useLocationsSearch = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);

  const allLocations = useMemo(() => {
    const countries = Country.getAllCountries().map(c => c.name);
    const allCities = City.getAllCities().map(x => ({
      city: x.name,
      state: x.stateCode,
      country: Country.getCountryByCode(x.countryCode)?.name ?? "",
    }));

    const remoteLocations = countries.map(countryName => ({
      city: `Remote in ${countryName}`,
      state: "",
      country: countryName,
    }));

    const combinedLocations = [...remoteLocations, ...allCities];

    combinedLocations.sort((a, b) => {
      const aIsUSorCanada =
        a.country === "United States" || a.country === "Canada";
      const bIsUSorCanada =
        b.country === "United States" || b.country === "Canada";

      // Sort US and Canada first
      if (aIsUSorCanada && !bIsUSorCanada) return -1;
      if (!aIsUSorCanada && bIsUSorCanada) return 1;

      // Sort alphabetically by city otherwise
      return a.city.localeCompare(b.city);
    });

    return combinedLocations;
  }, []);

  const handleSearch = (val: string) => {
    if (val.trim() !== "") {
      const query = val.toLowerCase().trim();
      const matchedLocations = allLocations.filter(location => {
        const cityMatch = location.city.toLowerCase().startsWith(query);
        return cityMatch;
      });

      matchedLocations.sort((a, b) => {
        const aCityMatch = a.city.toLowerCase().startsWith(query);
        const bCityMatch = b.city.toLowerCase().startsWith(query);
        const aIsUSorCanada =
          a.country.toLowerCase() === "united states" ||
          a.country.toLowerCase() === "canada";
        const bIsUSorCanada =
          b.country.toLowerCase() === "united states" ||
          b.country.toLowerCase() === "canada";

        // Sort by city match first, then by US/Canada
        if (aCityMatch && !bCityMatch) return -1;
        if (!aCityMatch && bCityMatch) return 1;
        if (aIsUSorCanada && !bIsUSorCanada) return -1;
        if (!aIsUSorCanada && bIsUSorCanada) return 1;

        // Sort alphabetically if no special priority
        return a.city.localeCompare(b.city);
      });
      setLocations(matchedLocations.slice(0, 8));
    } else {
      setLocations([
        { city: "Waterloo", state: "ON", country: "Canada" },
        { city: "Toronto", state: "ON", country: "Canada" },
        { city: "New York City", state: "NY", country: "United States" },
        { city: "Menlo Park", state: "CA", country: "United States" },
        { city: "Austin", state: "TX", country: "United States" },
      ]);
    }
  };

  return {
    locations,
    handleSearch,
  };
};
