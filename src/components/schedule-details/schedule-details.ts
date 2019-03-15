import { Component } from '@angular/core';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { NavParams, NavController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { ConfigAtributes } from '../../interfaces/meetingroom.interface';
import { KEY_LOCAL_STORAGE, TIME_RESERVATION } from '../../environments/enviroments';

/**
 * Generated class for the ScheduleDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'schedule-details',
  templateUrl: 'schedule-details.html'
})
export class ScheduleDetailsComponent {

  text: string;
  schedules:Schedules[];
  configApp:ConfigAtributes;
  listSchedulesSelected:number[] = [];
  fristPosition:number;
  min:number;
  max:number;
  numberOfOptions:number;
  disabledReservationBtn:boolean = true;
  meetingRoom:any;

  constructor( private events_manager: EventsManagerProvider,
    private navParams: NavParams,
    private storage_provider: LocalStorageProvider,
    private navCtrl: NavController ) {
      this.schedules = this.navParams.get('schedules');
      this.schedules.forEach( (schedule:Schedules) => {
        if( schedule.selected ) {
          this.listSchedulesSelected.push( schedule.id );
          this.disabledReservationBtn = false;
        }
      });
      this.meetingRoom = this.navParams.get('meetinRoom');
      this.configApp = this.storage_provider.getItem( KEY_LOCAL_STORAGE.CONFIG_APP );
      this.numberOfOptions = this.configApp.reservationMaxTime / TIME_RESERVATION;
  }

  ionViewDidLoad(){
    this.events_manager.setIsLoadingEvent( false );
  }

  selectSchedule( schedule:Schedules,idSchedule:number ) {
    if( !schedule.taken ) {
      if( schedule.selected ){
        schedule.selected = !schedule.selected;
        this.listSchedulesSelected = this.listSchedulesSelected.filter( item => item != idSchedule );
        this.disabledReservationBtn = this.listSchedulesSelected.length === 0;
        this.chechkSecuenceSchedule()
        return;
      }
  
      schedule.selected = !schedule.selected;
      this.listSchedulesSelected.push( idSchedule );
  
      if( this.listSchedulesSelected.length <= this.numberOfOptions  ){
        this.chechkSecuenceSchedule();
      }else {
        this.disabledReservationBtn = true;
      }
    }
  }

  chechkSecuenceSchedule() {
    let orderArray = this.listSchedulesSelected.sort( (a,b) => a - b );
    let count = 0; 
    let pila;
      for(let item of orderArray){
        if( count === 0 ){
          this.disabledReservationBtn = false;
          pila = item;
          count += 1;
          continue;
        }
        if( (pila+1) === item ){
          count += 1;
          pila = item;
        }else{
          this.disabledReservationBtn = true;
          break;
        }
      }
  }

  cancel() {
    this.navCtrl.pop();
  }

  confirmSchedules() {
    if( !this.disabledReservationBtn ){
      this.events_manager.setSchedules( {schedulesSelected:this.schedules,meetinRoomSelected:this.meetingRoom} );
      this.navCtrl.pop();
    }
  }


}

export interface Schedules {
  id:number
  hours:string;
  taken: boolean
  selected?:boolean;
}



