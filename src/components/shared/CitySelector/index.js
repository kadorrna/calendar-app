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
        valueType="short"
        onChange={handleCountryChange}
        className="selectorSelect"
      />
      <RegionDropdown
        value={region}
        country={country}
        countryValueType="short"
        onChange={handleRegionChange}
        className="selectorSelect"
      />
    </>
  );
};

export default CitySelector;
