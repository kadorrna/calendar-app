import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import CitySelector from "../../../components/shared/CitySelector";

describe.only("TimeSelector", () => {
  beforeEach(() => {
    render(<CitySelector date={""} />);
  });

  test.only("renders basic component", () => {
    const inputs = screen.getAllByRole("combobox");
    expect(inputs.length).toBe(2);
  });
});
