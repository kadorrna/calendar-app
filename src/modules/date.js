export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const nextMonthInCalendar = (fullYear, month) => {
  if (month === 11) {
    return {
      month: 0,
      year: fullYear + 1,
    };
  }

  return {
    month: month + 1,
    year: fullYear,
  };
};

export const monthToRender = (month, fullYear) => {
  const nextInCalendar = nextMonthInCalendar(fullYear, month);
  const daysInMonth = new Date(
    nextInCalendar.year,
    nextInCalendar.month,
    0
  ).getDate();
  const daysInPreviousMonth = new Date(fullYear, month, 0).getDate();
  const firstWeekDayMonth = new Date(fullYear, month, 1).getDay();
  const lastWeekDayMonth =
    new Date(nextInCalendar.year, nextInCalendar.month, 1).getDay() - 1;
  let monthCalendar = [];

  //add days from previous month to first week
  if (firstWeekDayMonth > 0) {
    for (let i = 0; i < firstWeekDayMonth; i++) {
      monthCalendar.push({
        date: new Date(fullYear, month - 1, daysInPreviousMonth - i),
        events: [],
        css: "nonActual",
      });
    }
    monthCalendar.reverse();
  }

  // add all days from month
  for (let i = 1; i <= daysInMonth; i++) {
    monthCalendar.push({
      date: new Date(fullYear, month, i),
      events: [],
      css: "",
    });
  }
  // add next month days to round week
  if (lastWeekDayMonth < 6 && lastWeekDayMonth >= 0) {
    const extraDays = 6 - lastWeekDayMonth;
    for (let i = 1; i <= extraDays; i++) {
      monthCalendar.push({
        date: new Date(nextInCalendar.year, nextInCalendar.month, i),
        events: [],
        css: "nonActual",
      });
    }
  }
  return monthCalendar;
};
