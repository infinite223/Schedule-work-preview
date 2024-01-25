import { formatDateToString, formatStringToDate } from "./functions";
import { DateWithUsers, DayData, Group } from "./types";

export function daysInMonth(selectDate: Date) {
  const nowYear = selectDate.getFullYear();
  const nowMoth = selectDate.getMonth() + 1;

  return new Date(nowYear, nowMoth, 0).getDate();
}
export const firstDayOfMonth = (
  selectDate: Date,
  data: DayData[],
  selectedGroupId: string,
) => {
  const arr: { id: number; date: Date; users: DayData[]; noDay: boolean }[] = [];
  const newArr = [];
  const year = selectDate.getFullYear();
  const month = selectDate.getMonth();

  const firstDay = new Date(year, month, 0).getDay();

  for (let i = 0; i < firstDay; i++) {
    arr.push({ id: 0, noDay: true, date: new Date(year, month, 0), users: [] });
  }

  for (let i = 1; i < daysInMonth(selectDate) + 1; i++) {
    // const findGroup = groups.find(
    //   (group: Group) => group.id.toString() === selectedGroupId.toString(),
    // );
    // const findDay = findGroup?.days?.find(
    //   (day: any) => formatStringToDate(day.date).getDate() === i,
    // );
    // let users = findDay ? findDay.usersInDay : [];

    // arr.push({ id: i, noDay: false, date: new Date(year, month, i), users });
    // newArr.push(`${year}/${month}/${i}`);
    const findDaysInData =  data.filter((days) => formatDateToString(days.date.toDate()) === formatDateToString(new Date(year, month, i)))
    if(findDaysInData && findDaysInData.length > 0) {
      let usersInDay = findDaysInData.map((day) =>  { return ( {userUid: day.userUid, start: day.start, end: day.end, date: day.date} ) })
      arr.push({ id: i, noDay: false, date: new Date(year, month, i), users: usersInDay })
    }
    else {
      arr.push({ id: i, noDay: false, date: new Date(year, month, i), users: []})
    }
  }

  return arr;
};

export const e = 2