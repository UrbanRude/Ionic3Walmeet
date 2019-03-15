import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CheckAvailabilityRequestVO, Reservation } from "../models/meeting.model";
import { Injectable } from "@angular/core";
import { EMPTY_RESPONSE_SEARCH_MEETING } from "../environments/enviroments";
import { ReportIncident } from "../pages/consult-reservations/consult-reservations";


@Injectable()
export class MeetingMockProvider {
    
    constructor(private http:HttpClient){}

    searchRoomForReservation( meeting:any ) {
        return this.http
                    .get( 'assets/json/get_search_meeting.json' )
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
        return this.http
                   .get( 'assets/json/get_schedules_meeting.json' )
                   .map( (response:any) => {
                     response.businessResponse.data.resultMeetingRoomSearchVO.forEach( element => {
                       element.selected = false;
                     });
                     return response;
                   });
      }

      deleteReservation( reservation:Reservation ){
        return this.http.get('assets/json/get_delete_reservation.json');
      }
    
      sendIncident( incident:ReportIncident ){
        return this.http.get('assets/json/get_report_incident.json');
      }

    getMeetingRoomByUser( user:string ){
        return this.http.get( 'assets/json/get_find_all.json' );
    }
    
    generateReservation( reservation:Reservation ) {
        return this.http.get( 'assets/json/post_generate_reservation.json' );
    }

    getMapMeetingRoom( idMeetingRoom:number ){
        return this.http.get( 'assets/json/get_image_map.json' )
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

    getMeetingFindAll( id = 0 ){
      return this.http.get( 'assets/json/get_all_meeting_room.json' );
    }

    getMeetingRoomDetailsForDay( detailsMeeting ) {
      return this.http
                 .get( 'assets/json/get_day_meeting_room.json' )
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
      return this.http
                 .get('assets/json/get_meeting_by_id.json')
                 .map( (response:any) => {
                  if( !response.zeusHeaderResponse.businessSuccess ) {
                    throw new Error(EMPTY_RESPONSE_SEARCH_MEETING);
                  }
                  return response.businessResponse.data;
                 }) ;
    }



}