import { SearchMeetingRoomInterface, ReservationInterface, AssignedInterface } from "../interfaces/meetingroom.interface";

export class SearchMeetingRoom implements SearchMeetingRoomInterface{
    
    blackboard:number;
    building: number[] = [];    
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

    constructor( date?:Date ) {
        date = date != null ? date : new Date();
        this.dateReservation = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        this.consultingRoom = 0;
    }

}


export class CheckAvailabilityRequestVO {
    customSchedule: number;
    meetingRoomId: number;
    reservationDate: string;
}

export class Reservation implements ReservationInterface {
    
    assigned: Assigned;
    allDay: boolean;    
    dateReservation: string;
    id: number;
    justification: string;
    meetingRoomId: number;
    reservetaionRankId: number[];
    user: string;
    specialRequirement:string;
}

export class Assigned implements AssignedInterface {
    adminUserId: string;    
    adminUserMail: string;
    adminUserName: string;
    domain: string;
    id: number;
}

export class SearchUser {
    userDomain: string;
    userFirstName: string;
    userLastName: string;
    userName: string;

    constructor() {
        this.userFirstName = '';
        this.userLastName = '';
    }
}

export class notificationInfoVO{
    idReservation: number;
    type: number;
    user: string;
    meetingRoom: string;
    buildingName: string;
    isAuditorium: boolean;
    isAllDay: boolean;
    dateReservation: string;
    timeReservaton: string;
    desc: number;
    hour: string;
    reason: string;
}

export interface ReservationQR {
    dateReservation: string;
    meetingRoomName: string;
    reservationTime: string;
    user: string;
}

export interface QRCode {
    building: string;
    floor: number;
    id: number;
    meetingRoomType: string;
    name: string;
    responsable: string;
}