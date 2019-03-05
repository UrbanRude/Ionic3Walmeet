import { Assigned } from "../models/meeting.model";

export interface SearchMeetingRoomInterface {
  building: number[];
  capacity: number;
  consultingRoom: number;
  dateReservation: string;
  hourReservation: string;
  isAllDay: number;
  isAuditorium: number;
  monitor: number;
  projector: number;
  supplier: number;
  telephone: number;
  tv: number;
  videoConference: number;
}

export interface ConfigAtributes {
  checkinTime:number;
  maxDaysReservation:number;
  reservationMaxTime:number;
}

export interface ReservationInterface {
  allDay: boolean;
  assigned: Assigned;
  dateReservation: string;
  id: number;
  justification: string;
  meetingRoomId: number;
  reservetaionRankId: number[];
  user: string;
}

export interface AssignedInterface {
  adminUserId: string;
  adminUserMail: string;
  adminUserName: string;
  domain: string;
  id: number;
}