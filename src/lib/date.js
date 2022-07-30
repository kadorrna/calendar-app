const dt = new Date();
const year = dt.getFullYear();

export const monthToRender = (month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const monthFirstWeekDay = new Date(year, month, 1).getDay();
  const monthLastWeekDay = new Date(year, month + 1, 0).getDay() - 1;
  let monthCalendar = [];

  //add days from previous month to first week
  if (monthFirstWeekDay > 0) {
    for (let i = 0; i < monthFirstWeekDay - 1; i++) {
      monthCalendar.push({
        date: daysInPreviousMonth - i,
        events: [],
      });
    }
    monthCalendar.reverse();
  }
  // add all days from month
  for (let i = 1; i <= daysInMonth; i++) {
    monthCalendar.push({
      date: i,
      events: [],
    });
  }

  // add next month days to round week
  if (monthLastWeekDay < 6) {
    const extraDays = monthLastWeekDay > 0 ? 6 - monthLastWeekDay : 0;
    for (let i = 1; i <= extraDays; i++) {
      monthCalendar.push({
        date: i,
        events: [],
      });
    }
  }

  return monthCalendar;
};

export const actualMonthToRender = () => monthToRender(dt.getMonth());
// export const actualMonthToRender = () => monthToRender(8);
