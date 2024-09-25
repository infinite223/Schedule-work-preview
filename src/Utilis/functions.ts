// import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "./globalStyles";
import { timeCounter } from "./timeCounter";
import { DayData, UserInDay } from "./types";
// import { Log, UserInDay } from "./types";
// import { router } from "expo-router";

export const formatDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
};

export const formatStringToDate = (dateString: string) => {
  const parts = dateString.split("/");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  return date;
};

export const countAllHoursInMonthV2 = (
  data: { id: number; date: Date; users: DayData[]; noDay: boolean }[]
) => {
  const workHoursPerUser: any = {};
  let totalHours = 0;
  let totalMinutes = 0;
  let expectedTotalHours = 0;

  data.forEach((day) => {
    if (!day.users || day.users.length === 0) return;

    const currentDay = new Date(day.date).getDay(); // Pobranie dnia tygodnia (0 - niedziela, 1 - poniedziałek, ..., 6 - sobota)

    // Oblicz przewidywaną liczbę godzin w zależności od dnia tygodnia
    if (currentDay === 5) {
      expectedTotalHours += 10 + 5; // Piątek: 10h pierwsza zmiana + 5h druga zmiana
    } else if (currentDay === 6 || currentDay === 0) {
      expectedTotalHours += 8 + 5; // Sobota i Niedziela: 8h pierwsza zmiana + 5h druga zmiana
    } else {
      expectedTotalHours += 10; // Poniedziałek - Czwartek: maksymalnie 10h
    }

    day.users.forEach((user) => {
      if (!workHoursPerUser[user.userUid]) {
        workHoursPerUser[user.userUid] = { hours: 0, minutes: 0 };
      }
      if (!user.block && !user.remove) {
        const time = timeCounter(user?.start, user.end);

        workHoursPerUser[user.userUid].hours += time.godziny;
        workHoursPerUser[user.userUid].minutes += time.minuty;

        // Sumowanie całkowitych godzin i minut dla wszystkich użytkowników
        totalHours += time.godziny;
        totalMinutes += time.minuty;

        // Normalizacja minut
        if (workHoursPerUser[user.userUid].minutes >= 60) {
          workHoursPerUser[user.userUid].hours += Math.floor(
            workHoursPerUser[user.userUid].minutes / 60
          );
          workHoursPerUser[user.userUid].minutes =
            workHoursPerUser[user.userUid].minutes % 60;
        }
      }
    });
  });

  // Normalizacja sumarycznych minut
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  // Zwrócenie wyniku
  return {
    workHoursPerUser,
    totalHours,
    totalMinutes,
    expectedTotalHours, // Przewidywana liczba godzin z uwzględnieniem drugiej zmiany
  };
};

export function addMonthsToDate(date: Date, months: number) {
  const newDate = new Date(date);
  const currentMonth = newDate.getMonth();
  const targetMonth = (currentMonth + months) % 12;
  newDate.setMonth(targetMonth);

  if (currentMonth + months >= 12) {
    newDate.setFullYear(newDate.getFullYear() + 1);
  }

  return newDate;
}

export const getColorDot = (userInDay: DayData) => {
  if (userInDay?.start && userInDay?.end) {
    const time = timeCounter(userInDay.start, userInDay.end);

    if (time.godziny > 7) return colors.fullDayHours;
    if (time.godziny <= 7) return colors.halfDayHours;
  }

  return;
};

export const countHoursForMonth = (
  userUid: string,
  days: { id: number; date: Date; users: DayData[]; noDay: boolean }[]
) => {
  let hours = 0;
  let fullHours = 0;

  for (const day of days) {
    const userInDay = day.users.find((_user) => _user.userUid === userUid);
    // hours +=userInDay.
  }
  return { hours, fullHours };
};

// export const setLogsInStorage = async (newLog: Log) => {
//   const logsValue = await AsyncStorage.getItem("logs");

//   if (logsValue != null) {
//     let newLogs = JSON.parse(logsValue);
//     newLogs.push(newLog);
//     await AsyncStorage.setItem("logs", JSON.stringify(newLogs));
//   } else {
//     await AsyncStorage.setItem("logs", JSON.stringify([newLog]));
//   }
// };

// export const setCountRequestStorage = async () => {
//   const countRequestStorage = await AsyncStorage.getItem("countRequest");
//   console.log("logs  +1", countRequestStorage)
//   if (countRequestStorage != null) {
//     let countRequest = JSON.parse(countRequestStorage);
//     if(countRequest>400) {
//       await AsyncStorage.removeItem('my-key');
//     }

//     await AsyncStorage.setItem("countRequest", JSON.stringify(countRequest + 1));
//   } else {
//     await AsyncStorage.setItem("countRequest", JSON.stringify(1));
//   }
// };
export const e = 2;
