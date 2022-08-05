import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils";

import ReminderForm from "../../components/EventOffCanvas/reminderForm";

const testingDate = new Date("2022-08-05T08:00:00");
const longDescription = "this description is incorrect because is too long ";

const handleSubmit = jest.fn();

beforeEach(() => {
  handleSubmit.mockClear();
});

test("renders basic form elements", () => {
  renderWithProviders(<ReminderForm date={testingDate} />);
  const reminderDescriptionLabel = screen.getByRole("textbox");
  expect(reminderDescriptionLabel).toBeInTheDocument();
  const colorPicker = screen.getByTestId("color-picker");
  expect(colorPicker).toBeInTheDocument();

  const timeSelector = screen.getByTestId("time-selector");
  expect(timeSelector).toBeInTheDocument();

  const regionSelector = screen.getByTestId("region-selector");
  expect(regionSelector).toBeInTheDocument();

  const button = screen.getByTestId("submitButton");
  expect(button).toHaveTextContent("Add new reminder");
});

test("description errors", async () => {
  renderWithProviders(<ReminderForm date={testingDate} />);
  user.click(screen.getByRole("button", { name: /Add new reminder/i }));
  await waitFor(() => {
    expect(screen.getByText("Description needed")).toBeInTheDocument();
  });
  user.type(getDescription(), longDescription);
  user.click(screen.getByRole("button", { name: /Add new reminder/i }));
  await waitFor(() => {
    expect(
      screen.getByText("Description can't have more than 30 chars")
    ).toBeInTheDocument();
  });
});

function getDescription() {
  return screen.getByRole("textbox");
}
