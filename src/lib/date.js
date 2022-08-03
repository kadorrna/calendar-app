const dt = new Date();
const year = dt.getFullYear();

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

export const monthToRender = (month) => {
  // month para atras y ser consistente
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const firstWeekDayMonth = new Date(year, month, 1).getDay();
  const lastWeekDayMonth = new Date(year, month + 1, 1).getDay() - 1;
  let monthCalendar = [];

  //add days from previous month to first week
  if (firstWeekDayMonth > 0) {
    for (let i = 0; i < firstWeekDayMonth; i++) {
      monthCalendar.push({
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        events: [],
        css: "nonActual",
      });
    }
    monthCalendar.reverse();
  }

  // add all days from month
  for (let i = 1; i <= daysInMonth; i++) {
    monthCalendar.push({
      date: new Date(year, month, i),
      events: [],
      css: "",
    });
  }
  // add next month days to round week
  if (lastWeekDayMonth < 6) {
    const extraDays = lastWeekDayMonth > 0 ? 6 - lastWeekDayMonth : 6;
    for (let i = 1; i <= extraDays; i++) {
      monthCalendar.push({
        date: new Date(year, month + 1, i),
        events: [],
        css: "nonActual",
      });
    }
  }

  return monthCalendar;
};

export const actualMonthToRender = () => monthToRender(dt.getMonth());
