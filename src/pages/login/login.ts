import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OnboardingPage } from '../onboarding/onboarding';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { HomePage } from '../home/home';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { ONBOARDING,KEY_LOCAL_STORAGE } from '../../environments/enviroments';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions'
import { LoginProvider } from '../../providers/login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationProvider } from '../../providers/configuration/configuration';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { LoginMockProvider } from '../../mock/login-mock-provider';
import { ConfigurationMockProvider } from '../../mock/configuration-mock-provider';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  domains:any[] = [];
  loginForm:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private local_storage: LocalStorageProvider,
    private events_manager: EventsManagerProvider,
    private nativePageTransition:NativePageTransitions,
    private login_provider: LoginProvider,
    private fb: FormBuilder,
    private configuration_provider: ConfigurationProvider) {
      
      this.login_provider
          .getDomains()
          .subscribe( (reponse:any) => {
            this.domains = reponse.GetDomainsResponse.businessResponse;
          });

      this.loginForm = this.fb.group({
        userWalmart:[ '',Validators.compose([Validators.required]) ],
        userPwd:[ '',Validators.compose([Validators.required]) ],
        userDomain:[ '',Validators.compose([Validators.required]) ]
      });

      let buildings = this.configuration_provider.getAllBuildings();
      let config = this.configuration_provider.getConfig();

      forkJoin([buildings,config]).subscribe( (responses:any) => {
        this.local_storage.saveItem( KEY_LOCAL_STORAGE.BUILDING_TABLE_VO,responses[0].businessResponse.data.buildingTableVO );
        this.local_storage.saveItem( KEY_LOCAL_STORAGE.CONFIG_APP,responses[1].businessResponse.data.configBuilding );
      });

  }

  ionViewDidLoad() {
  }
  

  login() {
    if( this.loginForm.valid ) {
      this.events_manager.setIsLoadingEvent( true );
      let userForm = this.loginForm.getRawValue();
      this.login_provider
          .validateUser( userForm.userDomain.NetBiosName,userForm.userWalmart,userForm.userPwd, )
          .subscribe( (response:any) => {
            if( response.serviceEngineResponse.headerResponse.responseCode === 'OK' ){
              this.login_provider
                  .getUserDetail( response.serviceEngineResponse.businessResponse.ValidateUserResponse.businessResponse.DomaintItemsResult.TokenString )
                  .subscribe( (responseUserDetail:any) => {
                    this.local_storage.saveItem( KEY_LOCAL_STORAGE.USER_DETAIL,responseUserDetail.GetUserDetailResponse.businessResponse.DomaintItemsResult.UserDetail );
                    this.goHome(userForm.userWalmart);
                  }, error => console.log(error));
            } else {
              this.events_manager.setGeneralNotificationMessage( 'Usuario y/o contraseña incorrecta' );
            }
          }, error => {
            console.log( error );
            this.events_manager.setGeneralNotificationMessage( 'Error en el servicio :(' );
          });
    }
    
  }

  goHome(userWalmart:string) {

    this.login_provider
        .verifySupplier( userWalmart )
        .subscribe( (response:any) => {
          this.local_storage.saveItem( KEY_LOCAL_STORAGE.TYPE_USER,response.businessResponse.data );
          let statusOnboarding = this.local_storage.getItem(ONBOARDING);
          if(statusOnboarding.view){ 
            this.navCtrl.setRoot( HomePage );
          } else{
            this.events_manager.setIsLoadingEvent( false );
            let options: NativeTransitionOptions = {
              direction:'left'
            };
            this.nativePageTransition.slide( options );
            this.navCtrl.setRoot( OnboardingPage );
          }
        });

  }


}
