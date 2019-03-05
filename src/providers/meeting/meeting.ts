import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZeusHeaderRequest, PaginationRequest, RequestWalmart } from '../../models/zeus.model';
import { GET_MEETING_ROOMS_SEARCH, GET_SCHEDULE_RESERVATION_BY_ID, FIND_BY_USER_MEETINGROOM, GENERATE_RESERVATION, CANCEL_RESERVATION, REPORT_INCIDENT, GET_MEETING_ROOM_FILTERS, GET_AVAILABILITY_DAY, GET_MEETING_ROOM_BULDING_BY_ID, GET_IMAGE_MAP } from '../../environments/endpoints';
import { Observable } from 'rxjs';
import { CheckAvailabilityRequestVO, Reservation } from '../../models/meeting.model';
import { ReportIncident } from '../../pages/consult-reservations/consult-reservations';
import { EMPTY_RESPONSE_SEARCH_MEETING } from '../../environments/enviroments';

/*
  Generated class for the MeetingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MeetingProvider {

  constructor(public http: HttpClient) {
  }

  searchRoomForReservation( meeting:any ) {
    let requestWalmart:RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.searchMeetingRoom = meeting;
    requestWalmart.paginationRequest = new PaginationRequest(100,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http
              .post( GET_MEETING_ROOMS_SEARCH, requestWalmart )
              .map( (response:any) => {
                if ( response.zeusHeaderResponse.businessSuccess ) {
                  return response;
                }
                throw new Error(JSON.stringify(response.zeusHeaderResponse));
              })
              .catch( error => {
                return Observable.throw(error);
              });
  }

  getScheduleMeetingRoomById( checkAvailability: CheckAvailabilityRequestVO ) {
    let requestWalmart:RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.availability = checkAvailability;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http
               .post( GET_SCHEDULE_RESERVATION_BY_ID,requestWalmart )
               .map( (response:any) => {
                 response.businessResponse.data.resultMeetingRoomSearchVO.forEach( element => {
                   element.selected = false;
                 });
                 return response;
               });
  }

  getMeetingRoomByUser( user:string ){
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.user = user;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http.post( FIND_BY_USER_MEETINGROOM, requestWalmart );
  }

  generateReservation( reservation:Reservation ) {
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.reservation = reservation;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http.post( GENERATE_RESERVATION,requestWalmart );
  }

  getMapMeetingRoom( idMeetingRoom:number ){
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest = idMeetingRoom;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http.post( GET_IMAGE_MAP,
                    requestWalmart )
                    .map( (response:any) => {
                      if( !response.zeusHeaderResponse.businessSuccess ) {
                        throw new Error('No se encontró el mapa de esta sala');
                      }
                      return response;
                    })
                    .catch( error => {
                      return Observable.throw(error);
                    });
  }
  
  deleteReservation( reservation:Reservation ){
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.reservation = reservation;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http.post(CANCEL_RESERVATION,requestWalmart);
  }

  sendIncident( incident:ReportIncident ){
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.reportIncident = incident;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http.post(REPORT_INCIDENT,requestWalmart);
  }

  getMeetingFindAll( id = 0 ){
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.id = id;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http.post( GET_MEETING_ROOM_FILTERS, requestWalmart );
  }

  getMeetingRoomDetailsForDay( detailsMeeting ) {
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.availability = detailsMeeting;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http
               .post(GET_AVAILABILITY_DAY,requestWalmart)
               .map( (response:any) => {
                if( !response.zeusHeaderResponse.businessSuccess ) {
                  throw new Error(EMPTY_RESPONSE_SEARCH_MEETING);
                }
                response.businessResponse.data.infoHour.forEach( (item,count) => {
                  if( item.available === 0){
                    let duration = Number(item.duration);
                    for (let index = 0; index < duration; index++) {
                      response.businessResponse.data.infoHour[count+index].occupied = true;
                    }
                  }
                });
                return response.businessResponse.data;
               }) ;
  }

  getMeetingRoomById( idMeeting:number ){
    let requestWalmart: RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest = idMeeting;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http
               .post(GET_MEETING_ROOM_BULDING_BY_ID,requestWalmart)
               .map( (response:any) => {
                if( !response.zeusHeaderResponse.businessSuccess ) {
                  throw new Error(EMPTY_RESPONSE_SEARCH_MEETING);
                }
                return response.businessResponse.data;
               }) ;
  }



}
