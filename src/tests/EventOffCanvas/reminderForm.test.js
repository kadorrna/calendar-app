import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

import ReminderForm from "../../components/EventOffCanvas/reminderForm";

const testingDate = new Date("2022-08-05T08:00:00");
const longDescription =
  "this description is incorrect because is too long " +
  Array(30).fill("a").join(" ");

test("renders basic form elements", () => {
  render(<ReminderForm date={testingDate} />);
  const reminderDescriptionLabel = screen.getByRole("textbox");
  expect(reminderDescriptionLabel).toBeInTheDocument();
  const colorPicker = screen.getByTestId("color-picker");
  expect(colorPicker).toBeInTheDocument();

  const timeSelector = screen.getByTestId("time-selector");
  expect(timeSelector).toBeInTheDocument();

  const regionSelector = screen.getByTestId("region-selector");
  expect(regionSelector).toBeInTheDocument();

  const button = screen.getByTestId("submitButton");
  expect(button).toHaveTextContent("Submit");
});

test("description errors", async () => {
  render(<ReminderForm date={testingDate} />);
  user.click(screen.getByRole("button", { name: /Submit/i }));
  await waitFor(() => {
    expect(screen.getByText("Description needed")).toBeInTheDocument();
  });

  user.type(getDescription(), longDescription);
  await waitFor(() => {
    expect(
      screen.getByText("Description can't have more than 30 words")
    ).toBeInTheDocument();
  });
});

function getDescription() {
  return screen.getByRole("textbox");
}
