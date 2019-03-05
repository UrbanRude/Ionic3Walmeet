import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { DAYS_NAME_LARGE, MONTHS, KEY_LOCAL_STORAGE, IMG_SUCCESS } from '../../environments/enviroments';
import { SearchMeetingRoom, CheckAvailabilityRequestVO, Reservation, Assigned } from '../../models/meeting.model';
import { ScheduleDetailsComponent } from '../../components/schedule-details/schedule-details';
import { MeetingProvider } from '../../providers/meeting/meeting';
import { DateREST, UtilUser } from '../../util/util';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { ActionModalComponent } from '../../components/action-modal/action-modal';
import { HomePage } from '../home/home';
import { ModalMapComponent } from '../../components/modal-map/modal-map';


@Component({
  selector: 'page-room-search-results',
  templateUrl: 'room-search-results.html'
})
export class RoomSearchResultsPage {

  listRoom:any[] = [];
  dateTitle:Date;
  daysName:string[] = DAYS_NAME_LARGE; 
  months:string[] = MONTHS;
  detailsMeeting:SearchMeetingRoom;
  meetingRoomSelected:any = {};
  idSelectedMeetingRoom:any;
  listScheduleSelected:any = null;
  justification:string;
  specialRequirement:string;
  userReservation:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private events_manager: EventsManagerProvider,
    private modalCtrl: ModalController,
    private meeting_provider: MeetingProvider,
    private storage_provider: LocalStorageProvider,
    private alertCtrl: AlertController) {

    this.listRoom = this.navParams.get('listRoom');
    this.dateTitle = this.navParams.get('dateSelected');
    this.detailsMeeting = this.navParams.get('meeting');
    this.justification = this.navParams.get('justification');
    this.userReservation = this.navParams.get('userReservation');
    this.specialRequirement = this.navParams.get('specialRequirement');

    this.events_manager.getSchedules().subscribe( data => {
      if( data != null ){
        this.listScheduleSelected = data.schedulesSelected;
        this.idSelectedMeetingRoom = data.meetinRoomSelected.id
        this.meetingRoomSelected = data.meetinRoomSelected;
      }else{
        this.idSelectedMeetingRoom = null;
      }
    });
    
  }

  ionViewDidLoad() {
    this.events_manager.setIsLoadingEvent( false );
  }

  showModalSchedules( schedules:any[],meetinRoom:any ) {
    let modal = this.modalCtrl.create( ScheduleDetailsComponent,{schedules,meetinRoom} );
    modal.present();
  }

  getSchedule( meetinRoom:any ){
    if( this.meetingRoomSelected.id != meetinRoom.id || this.idSelectedMeetingRoom == null){
      this.events_manager.setIsLoadingEvent( true );
      let checkAvalability: CheckAvailabilityRequestVO = new CheckAvailabilityRequestVO();
      checkAvalability.customSchedule = meetinRoom.customSchedule;
      checkAvalability.meetingRoomId = meetinRoom.id;
      checkAvalability.reservationDate = DateREST.getDateFormat( this.dateTitle );
      this.meeting_provider
          .getScheduleMeetingRoomById( checkAvalability )
          .subscribe( (response:any) => {
            let orderSchedules:any[] = response.businessResponse.data.resultMeetingRoomSearchVO;
            orderSchedules = orderSchedules.sort( (a:any,b:any) => a.id - b.id);
            if( this.detailsMeeting.isAllDay != 1 ){
              this.showModalSchedules( orderSchedules ,meetinRoom);
            }else{
              orderSchedules = orderSchedules.map( schedule => {
                schedule.taken =  true;
                return schedule;
              });
              this.showModalSchedules( orderSchedules ,meetinRoom);
            }
          });
    } else {
      this.showModalSchedules( this.listScheduleSelected,meetinRoom );
    }
  }

  confirmReservation( meetingRoom:any ) {
    let reservation:Reservation = new Reservation();
    reservation.allDay = this.detailsMeeting.isAllDay === 1;
    let assigned: Assigned = new Assigned();
    assigned.adminUserId = this.userReservation.LoginName;
    assigned.adminUserMail = this.userReservation.EmailAddress
    assigned.adminUserName = `${ this.userReservation.DisplayName }`;
    assigned.domain = UtilUser.getDomainUser( this.userReservation );
    reservation.assigned = assigned;
    reservation.dateReservation = DateREST.getDateFormat( this.dateTitle );
    reservation.justification = this.justification;
    reservation.meetingRoomId = meetingRoom.id;
    if( this.detailsMeeting.isAllDay != 1 ){
      reservation.reservetaionRankId = this.listScheduleSelected.filter( schedule => {
        if( schedule.selected ) {
          return schedule.id;
        }
      }).map( scheduleSelected => scheduleSelected.id );
    }else{
      reservation.reservetaionRankId = [];
    }
    reservation.specialRequirement = this.navParams.get('specialRequirement');
    reservation.user = this.userReservation.LoginName;
    this.events_manager.setIsLoadingEvent( true );
    this.meeting_provider.generateReservation( reservation )
                         .subscribe( respone => {
                           this.getMeetingsService();
                           this.events_manager.setIsLoadingEvent( false );
                           let modal = this.modalCtrl.create( ActionModalComponent,{imgAction:IMG_SUCCESS} );
                           modal.present();
                           let time = setTimeout( () => {
                            modal.dismiss();
                            this.navCtrl.setRoot( HomePage );
                           },3000);
                           modal.onWillDismiss( () => {
                             clearTimeout( time );
                             this.navCtrl.setRoot( HomePage );
                           });
                         }, error => console.log( error ) );

  }

  getUserDetail() {
    return this.storage_provider.getItem( KEY_LOCAL_STORAGE.USER_DETAIL );
  }

  showConfirmationReservation( meetingRoom:any ) {
    const alert = this.alertCtrl.create({
      title:`¿Estas seguro de reservar esta sala?`,
      buttons:[
        {
          text:'Cancelar',
          role:'cancel'
        },
        {
          text:'Ok',
          handler: () => {
            this.events_manager.setSchedules(null);
            this.confirmReservation( meetingRoom );
          }
        }]
    });
    alert.present();
  }

  getMeetingsService(){
    let userDetail = this.storage_provider.getItem( KEY_LOCAL_STORAGE.USER_DETAIL );
    this.meeting_provider.getMeetingRoomByUser(userDetail.LoginName).subscribe( (response:any) => {
      let meetings = response.businessResponse.data.mettings.sort( (a:any,b:any) => b.id - a.id); 
      this.storage_provider.saveItem(KEY_LOCAL_STORAGE.MEETINGS_ROOM,meetings);
    });
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
