import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MeetingProvider } from '../../providers/meeting/meeting';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { KEY_LOCAL_STORAGE } from '../../environments/enviroments';
import { DateREST } from '../../util/util';
import { ModalMapComponent } from '../../components/modal-map/modal-map';

/**
 * Generated class for the RoomAvailabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-room-availability',
  templateUrl: 'room-availability.html',
})
export class RoomAvailabilityPage {

  daysLimit:number;
  finalHour:string = '19:30'
  listMeetingRoom:any[] = [];
  listMeetingAutoComplete:any[] = [];
  meetingRoomDetails:DetailsMeetingRoom = new DetailsMeetingRoom();
  inputSearchBar:string;
  showAutoComplete:boolean = false;
  meetingRoom:MeetingRoom;
  
  meetingRoomSelected:any = null;
  daySelected:Date = null;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private meeting_provider: MeetingProvider,
    private events_manager: EventsManagerProvider,
    private ref: ChangeDetectorRef,
    private storage_provider: LocalStorageProvider,
    private modalCtrl: ModalController) {

      this.daysLimit = this.storage_provider.getItem( KEY_LOCAL_STORAGE.CONFIG_APP ).maxDaysReservation;

  }

  ionViewCanEnter(){
    this.events_manager.setIsLoadingEvent( true );
    if( !this.storage_provider.getItem( KEY_LOCAL_STORAGE.ALL_MEETING_ROOM ) ){
      this.meeting_provider.getMeetingFindAll().subscribe( (response:any) =>  {
        this.events_manager.setIsLoadingEvent( false );
        this.listMeetingRoom = response.businessResponse.data.meetingRoomTableVO;
        this.storage_provider.saveItem( KEY_LOCAL_STORAGE.ALL_MEETING_ROOM,this.listMeetingRoom );
      }, error => {
        this.events_manager.setIsLoadingEvent( false );
        console.log( error );
      });
    } else {
      this.listMeetingRoom = this.storage_provider.getItem( KEY_LOCAL_STORAGE.ALL_MEETING_ROOM );
      this.events_manager.setIsLoadingEvent( false );
    }
  }

  onInput() {
    if( this.inputSearchBar.trim() != "" ) {
      this.listMeetingAutoComplete = this.listMeetingRoom.filter( (meetingRoom:any) => {
        return (meetingRoom.name.toLowerCase().indexOf(this.inputSearchBar.toLowerCase()) > -1);
      }).slice(0,5);
      this.showAutoComplete = true;
      this.ref.detectChanges();
    }else{
      this.meetingRoomSelected = null;
      this.showAutoComplete = false;
    }
  }

  onClear($event) {
  }

  selectedMeetingRoom( meetingRoom:any ){
    this.meetingRoomSelected = meetingRoom;
    this.inputSearchBar = meetingRoom.name;
    this.showAutoComplete = false;
  }

  getMeetingById() {
    this.events_manager.setIsLoadingEvent( true );
    this.meeting_provider
        .getMeetingRoomById(this.meetingRoomSelected.id)
        .subscribe( response => {
          this.meetingRoom = response;
          this.getDetailsMeetingRoom();
        }, error => {
          console.log(error);
          this.events_manager.setIsLoadingEvent( false );
          this.events_manager.setGeneralNotificationMessage( error.message );
        });
  }


  getDetailsMeetingRoom() {
    
    let details = {
      meetingRoomId:this.meetingRoomSelected.id,
      reservationDate:DateREST.getDateFormat( this.daySelected )
    }
    this.meeting_provider
        .getMeetingRoomDetailsForDay( details )
        .subscribe( response => {
          console.log( response );
          this.events_manager.setIsLoadingEvent( false );
          this.meetingRoomDetails = response;
          this.ref.detectChanges();
        }, error => {
          this.events_manager.setIsLoadingEvent( false );
          this.events_manager.setGeneralNotificationMessage( error.message );
        });
  }

  selectedDay( day:Date ){
    this.daySelected = day;
  }

  showMapMeetingRoom( room ) {
    this.events_manager.setIsLoadingEvent( true );
    this.meeting_provider.getMapMeetingRoom( room.id ).subscribe( response => {
      this.events_manager.setIsLoadingEvent( false );
      let modal = this.modalCtrl.create( ModalMapComponent,{mapBase64:response.businessResponse.data} );
      modal.present(); 
    }, error => {
      this.events_manager.setIsLoadingEvent( false );
      this.events_manager.setGeneralNotificationMessage( error.message );
    });
  }

}

class DetailsMeetingRoom {
  allDay:boolean;
  infoHour:any[] = [];
}

class MeetingRoom {
  id: number;
  buildingId: number;
  buildingName: string;
  typeMeetingRoom: number;
  statusCode: number;
  meetingRommName: string;
  capacity: number;
  numberTable: number;
  projector: number;
  monitor: number;
  tv: number;
  videoConference: number;
  telephone: number;
  ext?: any;
  floor: string;
  creatorUser: string;
  createDate?: any;
  modifierUser?: any;
  modificationDate?: any;
  authorizerVp?: any;
  customScheduleId: number;
  imageBase64?: any;
  mobileWall?: any;
  meetingRoomIdMobileWall?: any;
  joinMeetingRoomId?: any;
}