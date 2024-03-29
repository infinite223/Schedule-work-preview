import { Timestamp } from "firebase/firestore";

type DateWithUsers = {
  date: Date;
  users: DayData[];
};
type DayData = {
  end: string; 
  start: string; 
  userUid: string; 
  date: Timestamp,
  groupUid: string,
  createdAt: Timestamp,
  remove: boolean,
  block?:boolean,
  id: string
}


type User = { 
  email: string,
  nick: string,
  uid: string,
  type: "admin" | 'user',
  groupId?: string | null
}

type GroupFirebase = {
  id: string;
  name: string;
  users: string[];
}

type GroupLocal = {
  id: string;
  name: string;
  users: User[];
}


type WorkPlace = {
  id: string;
  name: string;
  adminId: String;
};

type Log = {
  file: string;
  error: string;
  date: Date;
};

type Group = {
  id: string;
  name: string;
  description: string;
  workPlaceId: string;
  users?: User[];
};

type Day = {
  id: string;
  date: string;
  groupId: string;
};

type UserInDay = {
  id: string;
  from: string;
  to: string;

  userId: string;
  user?: User;
  day: Day;
  dayId: string;
};

export type { Group, User, WorkPlace, UserInDay, Day, DateWithUsers, Log, DayData, GroupFirebase, GroupLocal };
