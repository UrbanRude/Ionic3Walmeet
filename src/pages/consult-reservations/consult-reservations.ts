import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { KEY_LOCAL_STORAGE } from '../../environments/enviroments';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { MeetingProvider } from '../../providers/meeting/meeting';
import { Reservation } from '../../models/meeting.model';
import { ModalMapComponent } from '../../components/modal-map/modal-map';

/**
 * Generated class for the ConsultReservationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-consult-reservations',
  templateUrl: 'consult-reservations.html',
})
export class ConsultReservationsPage {

  meetings:Meeting[] = [];
  listMeetingAutoComplete:any[] = [];
  inputSearchBar:string;
  listMeetingRoom:any[] = [];
  showAutoComplete:boolean = false;

  meetingRoomSelected:any = null;

  constructor(public navCtrl: NavController, 
    
    public navParams: NavParams,
    private ref: ChangeDetectorRef,
    private meeting_provider: MeetingProvider,
    private storage_provider: LocalStorageProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private events_manager: EventsManagerProvider) {
      this.events_manager.setIsLoadingEvent( true );
    }
    
    ionViewDidLoad() {
      if(!this.storage_provider.getItem( KEY_LOCAL_STORAGE.MEETINGS_ROOM )){
        this.getMeetingsService();
      }else{
        this.meetings = this.storage_provider.getItem( KEY_LOCAL_STORAGE.MEETINGS_ROOM );
        this.events_manager.setIsLoadingEvent( false );
      }
    }

    getMeetingsService($event?){
      let userDetail = this.storage_provider.getItem( KEY_LOCAL_STORAGE.USER_DETAIL );
      this.meeting_provider.getMeetingRoomByUser(userDetail.LoginName).subscribe( (response:any) => {
        this.meetings = response.businessResponse.data.mettings.sort( (a:any,b:any) => b.id - a.id); 
        this.events_manager.setIsLoadingEvent( false );
        this.storage_provider.saveItem(KEY_LOCAL_STORAGE.MEETINGS_ROOM,response.businessResponse.data.mettings);
        if( $event ){
          $event.complete();
        }
      });
    }


    deleteMeetingRoom( meetingRoom:Meeting ){
      let user = this.storage_provider.getItem(KEY_LOCAL_STORAGE.USER_DETAIL);
      let meetingCancel = new Reservation();
      meetingCancel.id = meetingRoom.id;;
      meetingCancel.user = user.LoginName;
      this.meeting_provider.deleteReservation( meetingCancel ).subscribe( response => {
        this.getMeetingsService();
        this.events_manager.setGeneralNotificationMessage('La cancelación se realizó correctamente');
      });;
    }

    doRefresh($event) {
      this.getMeetingsService($event); 
    }

    confirmDeletion( meetingRoom:any ) {
      if( meetingRoom.status.toLocaleLowerCase() !== 'sala cancelada' ) {
        const alert = this.alertCtrl.create({
          title:`¿Estas seguro de cancelar esta reservación?`,
          buttons:[
            {
              text:'Cancelar',
              role:'cancel'
            },
            {
              text:'Ok',
              handler: () => {
                this.deleteMeetingRoom( meetingRoom );
              }
            }]
        });
        alert.present();
      }
    }

    confirmReportIssues( meetingRoom:any ) {
      const alert = this.alertCtrl.create({
        title:`Reportar daños en la sala`,
        inputs: [
          {
            name: 'desperfecto',
            placeholder: 'Desperfecto'
          },
        ],
        buttons:[
          {
            text:'Cancelar',
            role:'cancel'
          },
          {
            text:'Ok',
            handler: data => {
              this.reportIssues( meetingRoom,data.desperfecto );
            }
          }]
      });
      alert.present();
    }

    reportIssues(meetingRoom,msg){
      let user = this.storage_provider.getItem(KEY_LOCAL_STORAGE.USER_DETAIL);
      let meetingDetail = new ReportIncident();
      meetingDetail.reservationId = meetingRoom.id;
      meetingDetail.user = user.LoginName;
      meetingDetail.descriptionIncident = msg;
      this.meeting_provider.sendIncident( meetingDetail ).subscribe( response => {
        this.events_manager.setGeneralNotificationMessage('El reporte se envió correctamente');
      } );
    }

    showMeetingRoomMap(meetingRoom) {
      if( meetingRoom.status.toLocaleLowerCase() !== 'sala cancelada' ) {
        this.events_manager.setIsLoadingEvent( true );
        this.meeting_provider.getMapMeetingRoom( meetingRoom.id ).subscribe( response => {
          this.events_manager.setIsLoadingEvent( false );
          let modal = this.modalCtrl.create( ModalMapComponent,{mapBase64:response.businessResponse.data} );
          modal.present(); 
        }, error => {
          this.events_manager.setIsLoadingEvent( false );
          this.events_manager.setGeneralNotificationMessage( error.message );
        });
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
}

export class ReportIncident {
  reservationId: number;
  user:string;
  descriptionIncident:string;
  inputSearchBar:string;
}

class Meeting {
  id: number;
  meetingRoomName: string;
  floor: string;
  buildingName: string;
  capacity: string;
  reservationDate: string;
  reservationHour: string;
  status: string;
  meetingRoomType: string;
}