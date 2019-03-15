import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoInputModal } from '../../interfaces/meetingroom.interface';

@Injectable()
export class EventsManagerProvider {

  constructor() { }

  private generalNotificationMessage = new Subject<any>();
  private user = new Subject<any>();
  private isLoading = new Subject<boolean>();
  private isLogged = new Subject<boolean>();
  private isShowDotNotification = new Subject<boolean>();
  private schedules = new Subject<any>();
  private currentPage = new Subject<any>();
  private inputModal = new Subject<InfoInputModal>();
  private messageInputModal = new Subject<string>();
  private closeButtonToast = new Subject<boolean>();

  getGeneralNotificationMessage() {
    return this.generalNotificationMessage.asObservable();
  }

  setGeneralNotificationMessage(msg: string,type?,position = 'bottom',showCloseButton = false,closeButtonText = 'OK',duration = 3000  ){
    this.generalNotificationMessage.next({msg,type,position,duration,closeButtonText,showCloseButton});
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

  setCurrentPage( currentPage:any ) {
    this.currentPage.next(currentPage);
  }

  getCurrentPage() {
    return this.currentPage.asObservable();
  }

  setInputModal( info:InfoInputModal ) {
    this.inputModal.next( info );
  }

  getInputModal() {
    return this.inputModal.asObservable();
  } 

  setMessageInputModal( msg:string ){
    this.messageInputModal.next( msg );
  }

  getMessageInputModal(){
    return this.messageInputModal.asObservable();
  }

  setCloseButtonToast( clickButton:boolean ) {
    this.closeButtonToast.next( clickButton );
  }

  getCloseButtonToast() {
    return this.closeButtonToast.asObservable();
  }

}
