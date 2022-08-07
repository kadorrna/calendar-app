import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import TimeSelector from "../../../components/shared/TimeSelector";

describe.only("TimeSelector", () => {
  beforeEach(() => {
    render(<TimeSelector date={""} />);
  });

  test.only("renders basic component", () => {
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs.length).toBe(2);
  });
});
