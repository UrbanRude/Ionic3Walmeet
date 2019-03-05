import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventsManagerProvider {

  constructor() { }

  private generalNotificationMessage = new Subject<string>();
  private user = new Subject<any>();
  private isLoading = new Subject<boolean>();
  private isLogged = new Subject<boolean>();
  private isShowDotNotification = new Subject<boolean>();
  private schedules = new Subject<any>();

  getGeneralNotificationMessage() {
    return this.generalNotificationMessage.asObservable();
  }

  setGeneralNotificationMessage(msg: string){
    this.generalNotificationMessage.next(msg);
  }

  getIsLoadingEvent(){
    return this.isLoading.asObservable();
  }

  setIsLoadingEvent(isLoading: boolean){
    this.isLoading.next(isLoading);
  }

  setIsLogged(isLogged:boolean) {
    this.isLogged.next( isLogged );
  }
  
  getIsLogged() {
    return this.isLogged.asObservable();
  }

  setSchedules( schedules:any ) {
    this.schedules.next( schedules );
  }

  getSchedules() {
    return this.schedules.asObservable();
  }

  setUser( user:any ) {
    this.user.next( user );
  }

  getUser() {
    return this.user.asObservable();
  }

  setShowDotNotification( show:boolean ) {
    this.isShowDotNotification.next( show );
  }

  getShowDotNotification() {
    return this.isShowDotNotification.asObservable();
  }

}
