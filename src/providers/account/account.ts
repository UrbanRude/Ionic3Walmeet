import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { notificationInfoVO, Reservation } from '../../models/meeting.model';
import { ZeusHeaderRequest, PaginationRequest, RequestWalmart } from '../../models/zeus.model';
import { GET_NOTIFICATION } from '../../environments/endpoints';
import { Observable } from 'rxjs';



/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {

  constructor(public http: HttpClient) {
  }

  getNotificationsById( user:string, date:string){
    let requestWalmart:RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.user = user;
    requestWalmart.businessRequest.sendDate = date;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();

    return this.http.post( GET_NOTIFICATION,requestWalmart)
                    .map( (response:any) => {
                      if( response.zeusHeaderResponse.businessSuccess ) {
                        return response.businessResponse.data.notificationInfoVO.sort( (a:any,b:any) => b.idReservation - a.idReservation);;
                      } else {
                        throw new Error('Error en el servidor');
                      }
                    }).catch( error => {
                      return Observable.throw(error);
                    });;

  }
  
  checkInQRCode( checkin ) {
    let requestWalmart:RequestWalmart = new RequestWalmart();
    requestWalmart.businessRequest.reservation = checkin;
    requestWalmart.paginationRequest = new PaginationRequest(1000,'id');
    requestWalmart.zeusHeaderRequest = new ZeusHeaderRequest();
    return this.http.post( GET_NOTIFICATION,requestWalmart)
                    .map( (response:any) => {
                      if( response.zeusHeaderResponse.businessSuccess ) {
                        return response.businessResponse.data;
                      } else {
                        throw new Error('Error en el servidor');
                      }
                    }).catch( error => {
                      return Observable.throw(error);
                    });;
  }

}
