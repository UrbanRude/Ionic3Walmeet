import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_BUILDINGS, GET_CAPACITY_MEETING_ROOM_FILTERS, GET_CONFIG } from '../../environments/endpoints';
import { Observable } from 'rxjs';
import { RequestWalmart, PaginationRequest, ZeusHeaderRequest } from '../../models/zeus.model';

@Injectable()
export class ConfigurationProvider {

  constructor(public http: HttpClient) {
  }

  getAllBuildings() {
    let requestWalmart:RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest = {};
    requestWalmart.paginationRequest = new PaginationRequest(100,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http
               .post( GET_BUILDINGS, requestWalmart )
               .map( (response:any) => {
                  response.businessResponse.data.buildingTableVO.forEach( element => {
                    element.selected = false
                });
                return response;
              }).catch( this.handleError );
  }

  getCapacityMeeting( listIdBuildings:Array<number> ) {
    let requestWalmart:RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest = listIdBuildings;
    requestWalmart.paginationRequest = new PaginationRequest(100,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http
               .post( GET_CAPACITY_MEETING_ROOM_FILTERS, requestWalmart )
               .map( (response:any) => {
                 if( response.zeusHeaderResponse.businessSuccess ) {
                  return response.businessResponse.data;
                 } else {
                  throw new Error(JSON.stringify(response.zeusHeaderResponse));
                 }
               })
               .catch( this.handleError );
  } 

  getConfig() {
    return this.http.post( GET_CONFIG,{} );
  }

  handleError(error: any) {
    return Observable.throw(error);
  }

}
