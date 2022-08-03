import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import "./city-selector.css";

const CitySelector = ({
  country,
  region,
  handleCountryChange,
  handleRegionChange,
}) => {
  return (
    <>
      <CountryDropdown
        value={country}
        onChange={handleCountryChange}
        className="selectorSelect"
      />
      <RegionDropdown
        value={region}
        country={country}
        onChange={handleRegionChange}
        className="selectorSelect"
      />
    </>
  );
};

export default CitySelector;
