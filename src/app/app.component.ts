import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { EventsManagerProvider } from "../providers/events-manager/events-manager";
import { LoginPage } from '../pages/login/login';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { ConsultReservationsPage } from '../pages/consult-reservations/consult-reservations';
import { RoomAvailabilityPage } from '../pages/room-availability/room-availability';
import { AccountPage } from '../pages/account/account';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Observable } from 'rxjs';
import { AccountProvider } from '../providers/account/account';
import { CodeCameraPage } from '../pages/code-camera/code-camera';
import { CodeCameraTestPage } from '../pages/code-camera-test/code-camera-test';
import { CheckinPage } from '../pages/checkin/checkin';
import { DateREST } from '../util/util';
import { KEY_LOCAL_STORAGE } from '../environments/enviroments';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  loader: Loading;
  @ViewChild(Nav) nav: Nav
  isLogged:boolean = false;
  locationPage = HomePage;
  dotNotification:boolean = false;
  stringEmpty:string = ' ';

  footer = [
    {
        img:'assets/icon/history.svg',
        page:ConsultReservationsPage
    },
    {
        img:'assets/icon/magnifying-glass.svg',
        page:RoomAvailabilityPage
    },
    {
        img:'assets/icon/walmart_menu.svg',
        page:HomePage
    },
    {
        img:'assets/icon/qr-code.svg',
        page:CodeCameraPage
    },
    {
        img:'assets/icon/menu.svg',
        page:AccountPage
    }
  ]

  constructor(platform: Platform, 
              // statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private eventsManager: EventsManagerProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private local_storage:LocalStorageProvider,
              private nativePageTransitions:NativePageTransitions,
              private account_provider: AccountProvider){

    platform.ready().then(() => {

      if( !localStorage.getItem('onboarding') ){
        let viewOnboarding = {view:false};
        this.local_storage.saveItem( 'onboarding',viewOnboarding );
      }
      

      eventsManager.getIsLogged().subscribe( data => this.isLogged = data )

      eventsManager
        .getGeneralNotificationMessage()
        .subscribe(msg => {
          eventsManager.setIsLoadingEvent( false );
          const toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
          });
          toast.present();
        });

      eventsManager
        .getIsLoadingEvent()
        .subscribe(isLoading => {
          if(!this.loader) {
            this.loader = this.loadingCtrl.create({
              spinner:'hide',
              content: `<div class="wrapper-loading-walmart">
                <img src="assets/icon/walmart_menu.svg" class="img-loading"/> 
              </div>`
            });
          }
          if(isLoading){
            this.loader.present();
          }else{
            this.loader.dismiss();
            this.loader = null;
          }
        });

        eventsManager
          .getShowDotNotification()
          .subscribe( show => {
            console.log('Nueva notificacion');
            this.dotNotification = show;
          });

        this.getNotifications();

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        // statusBar.styleDefault();
        splashScreen.hide();

    });
  }

  goHome() {
    this.nav.push(HomePage);
  }

  goPage(link:any){
    let view = this.nav.getActive();
    if( view.component != link.page && link.page != null){
      if( link.page === AccountPage ) {
        let options: NativeTransitionOptions = {
          direction:'up'
        };
        this.nativePageTransitions.slide( options );
        this.nav.setRoot( link.page,{previusPage:view.component} );
        return;
      }
      this.locationPage = link.page;
      this.nav.setRoot( link.page );
    }
  }

  getNotifications() {
    Observable
      .interval(10000)
      .timeInterval()
      .flatMap( () => this.account_provider.getNotificationsById('vn0iwxf',`${DateREST.getDateFormat(new Date())} ${DateREST.getTimeFormat()}`) )
      .subscribe( (notifications:Array<any>) => {
        if( notifications.length > 0 ) {
          if( !this.local_storage.getItem(KEY_LOCAL_STORAGE.NOTIFICATIONS) ) {
            this.local_storage.saveItem( KEY_LOCAL_STORAGE.NOTIFICATIONS,notifications );
            this.eventsManager.setShowDotNotification( true );
          } else {
            let notificationStorage = this.local_storage.getItem( KEY_LOCAL_STORAGE.NOTIFICATIONS );
            let showDot:boolean = false;
            notifications.forEach(element => {
              let a = notificationStorage.find( notification => notification.idReservation === element.idReservation );
              if( !a ) {
                showDot = true;
                this.local_storage.saveItem( KEY_LOCAL_STORAGE.NOTIFICATIONS ,notifications);
              } 
            });
            this.local_storage.saveItem( KEY_LOCAL_STORAGE.NOTIFICATIONS,notifications );
            this.eventsManager.setShowDotNotification( showDot );
          }
        }
      }, error => console.log( error ));
  }

}

