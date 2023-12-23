// import { formatStringToDate } from "./functions";
// import { Group } from "./types";

// export function daysInMonth(selectDate: Date) {
//   const nowYear = selectDate.getFullYear();
//   const nowMoth = selectDate.getMonth() + 1;

//   return new Date(nowYear, nowMoth, 0).getDate();
// }

// export const firstDayOfMonth = (
//   selectDate: Date,
//   groups: any,
//   selectedGroupId: string,
// ) => {
//   const arr: { id: number; date: Date; users: []; noDay: boolean }[] = [];
//   const newArr = [];
//   const year = selectDate.getFullYear();
//   const month = selectDate.getMonth();

//   const firstDay = new Date(year, month, 0).getDay();

//   console.log(firstDay);

//   for (let i = 0; i < firstDay; i++) {
//     arr.push({ id: 0, noDay: true, date: new Date(year, month, 0), users: [] });
//   }

//   for (let i = 1; i < daysInMonth(selectDate) + 1; i++) {
//     const findGroup = groups.find(
//       (group: Group) => group.id.toString() === selectedGroupId.toString(),
//     );
//     const findDay = findGroup?.days?.find(
//       (day: any) => formatStringToDate(day.date).getDate() === i,
//     );
//     let users = findDay ? findDay.usersInDay : [];

//     arr.push({ id: i, noDay: false, date: new Date(year, month, i), users });
//     newArr.push(`${year}/${month}/${i}`);
//   }

//   return arr;
// };

export const e = 2