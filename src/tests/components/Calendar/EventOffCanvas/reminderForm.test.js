import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import user from "@testing-library/user-event";
import * as redux from "react-redux";

import { renderWithProviders } from "../../../test-utils";

import ReminderForm from "../../../../components/Calendar/EventOffCanvas/reminderForm";

const testingDate = new Date("2022-08-05T08:00:00");
const longDescription = "this description is incorrect because is too long ";

const defaultFormValues = {
  reminderTimeToRemove: "",
  isEdit: false,
  description: "",
  reminderColor: {
    hex: "#dedede",
  },
  time: "",
  geoLoc: {
    region: "",
    country: "",
  },
  weather: {},
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("ReminderForm create reminder", () => {
  beforeEach(() => {
    renderWithProviders(
      <ReminderForm date={testingDate} initialFormValues={defaultFormValues} />
    );
  });

  test("renders basic form elements", () => {
    const reminderDescriptionLabel = screen.getByRole("textbox");
    expect(reminderDescriptionLabel).toBeInTheDocument();
    const colorPicker = screen.getByTestId("color-picker");
    expect(colorPicker).toBeInTheDocument();

    const timeSelector = screen.getByTestId("time-selector");
    expect(timeSelector).toBeInTheDocument();

    const regionSelector = screen.getByTestId("region-selector");
    expect(regionSelector).toBeInTheDocument();

    const button = screen.getByTestId("submitButton");
    expect(button).toHaveTextContent("Create");
  });

  describe("when missing decription or is too long", () => {
    test("should show description errors", async () => {
      user.click(screen.getByRole("button", { name: /Create/i }));
      await waitFor(() => {
        expect(screen.getByText("Description needed")).toBeInTheDocument();
      });
      user.type(getDescription(), longDescription);
      user.click(screen.getByRole("button", { name: /Create/i }));
      await waitFor(() => {
        expect(
          screen.getByText("Description can't have more than 30 chars")
        ).toBeInTheDocument();
      });
    });
  });

  describe("when missng time", () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ selectBookingsForDate: ["10:00AM"] });

    test("should show time errors", async () => {
      let validationErrors;
      user.type(getDescription(), "test description");
      user.click(screen.getByRole("button", { name: /Create/i }));
      await waitFor(() => {
        validationErrors = screen.findByTestId("time-error");
        expect(validationErrors).not.toBe(null);
      });

      user.type(getHour(), "10");
      await waitFor(() => {
        validationErrors = screen.findByTestId("time-error");
        expect(validationErrors).not.toBe(null);
      });

      user.type(getMinutes(), "20");
      await waitFor(() => {
        validationErrors = screen.findByTestId("time-error");
        expect(validationErrors).not.toBe(null);
      });
    });
  });

  describe("when missing a city", () => {
    test("should show missing city errors", async () => {
      expect(screen.queryByTestId("geoLoc-error")).not.toBeInTheDocument();

      user.type(getDescription(), "test description");

      user.click(screen.getByRole("button", { name: /Create/i }));
      await waitFor(() => {
        expect(screen.queryByTestId("geoLoc-error")).toBeInTheDocument();
      });

      const countryDropdown = screen.getByDisplayValue("Select Country");
      userEvent.selectOptions(countryDropdown, "AR");

      await waitFor(() => {
        expect(screen.queryByTestId("geoLoc-error")).toBeInTheDocument();
      });
    });
  });
});

describe("ReminderForm edit reminder", () => {
  beforeEach(() => {
    renderWithProviders(
      <ReminderForm
        date={testingDate}
        initialFormValues={{ ...defaultFormValues, isEdit: true }}
      />
    );
  });
  test("it should change button when editing", async () => {
    const button = screen.getByTestId("submitButton");
    expect(button).toHaveTextContent("Update reminder");
  });
});

function getDescription() {
  return screen.getByRole("textbox");
}

function getHour() {
  return screen.findByRole("spinbutton", { name: /hour12/i });
}

function getMinutes() {
  return screen.findByRole("spinbutton", { name: /minute/i });
}

function getTimeSelector() {
  return screen.getByDisplayValue("--");
}
