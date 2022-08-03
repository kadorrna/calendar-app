import { GithubPicker } from "react-color";
import "./color-picker.css";

const colorsPicker = [
  "#B80000",
  "#DB3E00",
  "#FCCB00",
  "#008B02",
  "#006B76",
  "#1273DE",
  "#004DCF",
  "#5300EB",
  "#EB9694",
  "#FAD0C3",
  "#FEF3BD",
  "#C1E1C5",
  "#BEDADC",
  "#C4DEF6",
  "#BED3F3",
  "#D4C4FB",
  "#DEDEDE",
];

const ColorPicker = ({ value, handleChange }) => {
  return (
    <>
      <GithubPicker
        triangle="hide"
        onChange={handleChange}
        colors={colorsPicker}
      />
      <div className="col-5 selected-color-container justify-content">
        <div className="div-color" style={{ backgroundColor: value }}></div>
      </div>
    </>
  );
};

export default ColorPicker;
