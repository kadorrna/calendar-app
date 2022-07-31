const dt = new Date();
const year = dt.getFullYear();

export const monthToRender = (month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const monthFirstWeekDay = new Date(year, month, 1).getDay();
  const monthLastWeekDay = new Date(year, month + 1, 1).getDay() - 1;
  let monthCalendar = [];

  //add days from previous month to first week
  if (monthFirstWeekDay > 0) {
    for (let i = 0; i < monthFirstWeekDay; i++) {
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
  if (monthLastWeekDay < 6) {
    const extraDays = monthLastWeekDay > 0 ? 6 - monthLastWeekDay : 6;
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
