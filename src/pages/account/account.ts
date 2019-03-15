import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { LoginPage } from '../login/login';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { KEY_LOCAL_STORAGE } from '../../environments/enviroments';
import { AccountProvider } from '../../providers/account/account';
import { RequestWalmart } from '../../models/zeus.model';
import { CodeCameraPage } from '../code-camera/code-camera';
import { DateREST } from '../../util/util';


/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  userDetail:any;
  listNotifications:any[] = [];
  previusPage:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private account_provider:AccountProvider,
    private events_manager: EventsManagerProvider,
    private nativePageTransitions: NativePageTransitions,
    private alertCtrl: AlertController,
    private storage_provider: LocalStorageProvider) {
    this.previusPage = this.navParams.get('previusPage');
    this.events_manager.setIsLogged( false );
    this.userDetail = this.storage_provider.getItem( KEY_LOCAL_STORAGE.USER_DETAIL );
  }

  ionViewDidLoad() {
    this.getNotificationsById();
    this.events_manager.setShowDotNotification( false );
  }

  ionViewDidLeave(){
    this.events_manager.setIsLogged( true );
  }

  exitAccount() {
    // if( this.previusPage != CodeCameraPage ){
    //   let options: NativeTransitionOptions = {
    //     direction:'down'
    //   };
    //   this.nativePageTransitions.slide( options );
    //   this.navCtrl.setRoot(this.previusPage);
    // } 
    this.navCtrl.setRoot(this.previusPage);
  }

  logout() {
    const alert = this.alertCtrl.create({
      title:`¿Deseas cerrar sesion?`,
      buttons:[
        {
          text:'Cancelar',
          role:'cancel'
        },
        {
          text:'Ok',
          handler: () => {
            this.navCtrl.setRoot( LoginPage ).then( () => {
              this.storage_provider.cleanStorage();
              this.events_manager.setIsLogged( false );
            });
          }
        }]
    });
    alert.present();
  }

  getNotificationsById(){
    this.account_provider.getNotificationsById(this.userDetail.LoginName,`${DateREST.getDateFormat(new Date())} ${DateREST.getTimeFormat()}`).subscribe( notfif => {
     this.listNotifications = notfif; 
    });
  }

  completeNotification(){
    this.navCtrl.setRoot( CodeCameraPage );
  }

}
