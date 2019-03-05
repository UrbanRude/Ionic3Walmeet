import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { CheckinPage } from '../checkin/checkin';
import { ReservationQR, QRCode } from '../../models/meeting.model';
import { DateREST } from '../../util/util';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { KEY_LOCAL_STORAGE } from '../../environments/enviroments';
import { AccountProvider } from '../../providers/account/account';
import { Subscription } from 'rxjs';

/**
 * Generated class for the CodeCameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-code-camera',
  templateUrl: 'code-camera.html',
})
export class CodeCameraPage {

  qrSubscription:Subscription;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private qrScanner:QRScanner,
    private events_manager: EventsManagerProvider,
    private local_storage: LocalStorageProvider,
    private account_provider: AccountProvider,
    private toastCtrl: ToastController ) {
  }

  ionViewWillEnter(){
    this.events_manager.setIsLogged( true );
    this.showCamera();
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
       this.qrCodeScan();
      } else if (status.denied) {
       console.log('Camera permission denied');
      } else {
       console.log('Permission denied for this runtime.');
      }
     })
     .catch((e: any) => console.log('Error is', e));
   }
  ​
   ionViewDidLoad() {
   }
  ​
   showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
   }
   
   hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
   }
   
   ionViewWillLeave(){
    this.qrScanner.destroy()
    this.hideCamera(); 
   }

   goCheckIn( text:string ) {
     try {
       let textQR: QRCode = JSON.parse( text );
      //  let checkin: ReservationQR = {
      //    dateReservation: `${DateREST.getDateFormat(new Date())}`,
      //    meetingRoomName: textQR.name,
      //    reservationTime: `${DateREST.getTimeFormat()}`,
      //    user: this.local_storage.getItem( KEY_LOCAL_STORAGE.USER_DETAIL ).LoginName
      //  }
      //  this.account_provider.checkInQRCode( checkin ).subscribe();
      
      console.log( textQR );
      this.qrSubscription.unsubscribe();
      this.events_manager.setIsLoadingEvent( false );
      this.navCtrl.push( CheckinPage );
     } catch ( error ) {
       this.events_manager.setIsLoadingEvent( false );
       this.presentToast();
       console.log( 'Error',error );
     }
   }

   qrCodeScan() {
    this.qrSubscription = this.qrScanner.scan().subscribe((text: string) => {
      this.events_manager.setIsLoadingEvent( true );
      this.goCheckIn( text );
    },error => console.log( 'Error :(',error ));
    this.qrScanner.show();
   }

   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'No se puede leer codigo QR',
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(() => {
      this.qrCodeScan();
    });
    toast.present();
  }

}
