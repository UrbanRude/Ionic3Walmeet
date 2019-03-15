import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, LoadingController, Loading, ToastController, ModalController } from 'ionic-angular';
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
import { DateREST } from '../util/util';
import { KEY_LOCAL_STORAGE } from '../environments/enviroments';
import { Keyboard } from '@ionic-native/keyboard';
import { ModalInputComponent } from '../components/modal-input/modal-input';



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
  showKeyboard:boolean = false;

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
              private account_provider: AccountProvider,
              private keyboard: Keyboard,
              private modalCtrl: ModalController){

    platform.ready().then(() => {

      if( !localStorage.getItem('onboarding') ){
        let viewOnboarding = {view:false};
        this.local_storage.saveItem( 'onboarding',viewOnboarding );
      }

      // HIDE FOOTER
      this.keyboard.onKeyboardWillShow().subscribe( () => this.showKeyboard = true );
      this.keyboard.onKeyboardWillHide().subscribe( () => this.showKeyboard = false );
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      splashScreen.hide();

      eventsManager.getIsLogged().subscribe( data => this.isLogged = data )

      eventsManager
        .getGeneralNotificationMessage()
        .subscribe( info => {
          eventsManager.setIsLoadingEvent( false ); 
          let typeToast:string;
          if( info.type ) {
            typeToast = info.type === 'success' ? 'succesToast' : 'errorToast'; 
          }
          
          const toast = this.toastCtrl.create({
            message:info.msg,
            duration: info.duration,
            position: info.position,
            cssClass: typeToast,
            showCloseButton: info.showCloseButton,
            closeButtonText: info.closeButtonText
          });
          if( info.showCloseButton ) {
            toast.onDidDismiss(() => {
              this.eventsManager.setCloseButtonToast( true );
            });
          }
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

        eventsManager
          .getCurrentPage()
          .subscribe( page => this.locationPage = page);

        eventsManager
          .getInputModal()
          .subscribe( infoModal => {
            this.modalCtrl.create( ModalInputComponent,infoModal ).present();
          });  

        this.getNotifications();

       

    });
  }

  goHome() {
    this.nav.push(HomePage);
  }

  goPage(link:any){
    let view = this.nav.getActive();
    if( view.component != link.page && link.page != null){
      if( link.page === AccountPage ) {
        // let options: NativeTransitionOptions = {
        //   direction:'up'
        // };
        // this.nativePageTransitions.slide( options );
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

