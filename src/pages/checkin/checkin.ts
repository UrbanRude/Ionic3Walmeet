import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { KEY_LOCAL_STORAGE } from '../../environments/enviroments';
import { ReportIncident } from '../consult-reservations/consult-reservations';
import { MeetingProvider } from '../../providers/meeting/meeting';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { HomePage } from '../home/home';
import { InfoInputModal } from '../../interfaces/meetingroom.interface';

/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage_provider: LocalStorageProvider,
    private meeting_provider: MeetingProvider,
    private events_manager: EventsManagerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  confirmReportIssues() {
    let infoModal: InfoInputModal = {
      title:'Reportar daños en la sala'
    }
    this.events_manager.setInputModal(infoModal);
    let subs = this.events_manager
                   .getMessageInputModal()
                   .subscribe( msg => {
                    this.reportIssues( msg );
                    subs.unsubscribe();
                   },error => console.log( error ));
  }

  reportIssues(msg,meetingRoom?){
    let user = this.storage_provider.getItem(KEY_LOCAL_STORAGE.USER_DETAIL);
    let meetingDetail = new ReportIncident();
    meetingDetail.reservationId = 2234;
    meetingDetail.user = user.LoginName;
    meetingDetail.descriptionIncident = msg;
    this.meeting_provider.sendIncident( meetingDetail ).subscribe( response => {
      this.events_manager.setGeneralNotificationMessage('El reporte se envió correctamente');
    } );
  }

  goHome() {
    this.events_manager.setCurrentPage( HomePage );
    this.navCtrl.setRoot( HomePage );
  }

}
