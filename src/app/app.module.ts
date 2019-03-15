import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConsumeApiProvider } from '../providers/consume-api/consume-api';
import { EventsManagerProvider } from '../providers/events-manager/events-manager';
import { MatProgressBarModule} from '@angular/material';
import { LoginPage } from '../pages/login/login';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { OnboardingInfoProvider } from '../providers/onboarding-info/onboarding-info';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { ConsultReservationsPage } from '../pages/consult-reservations/consult-reservations';
import { RoomAvailabilityPage } from '../pages/room-availability/room-availability';
import { CalendarComponent } from '../components/calendar/calendar';
import { AccountPage } from '../pages/account/account';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { LoginProvider } from '../providers/login/login';
import { ConfigurationProvider } from '../providers/configuration/configuration';
import { MeetingProvider } from '../providers/meeting/meeting';
import { RoomSearchResultsPage } from '../pages/room-search-results/room-search-results';
import { ScheduleDetailsComponent } from '../components/schedule-details/schedule-details';
import { ActionModalComponent } from '../components/action-modal/action-modal';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { UserSearchComponent } from '../components/user-search/user-search';
import { ModalMapComponent } from '../components/modal-map/modal-map';
import { AccountProvider } from '../providers/account/account';
import { ConfigurationMockProvider } from '../mock/configuration-mock-provider';
import { LoginMockProvider } from '../mock/login-mock-provider';
import { MeetingMockProvider } from '../mock/meeting-mock-provider';
import { CodeCameraPage } from '../pages/code-camera/code-camera';
import { QRScanner } from '@ionic-native/qr-scanner';
import { CodeCameraTestPage } from '../pages/code-camera-test/code-camera-test';
import { CheckinPage } from '../pages/checkin/checkin';
import { ModalInputComponent } from '../components/modal-input/modal-input';
import { Keyboard } from '@ionic-native/keyboard';
import { TabshomePage } from '../pages/tabshome/tabshome';
import { MONTHS } from '../environments/enviroments';

export const MATERIAL_COMPONENTS = [
  MatProgressBarModule
]

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    OnboardingPage,
    ConsultReservationsPage,
    RoomAvailabilityPage,
    CalendarComponent,
    AccountPage,
    RoomSearchResultsPage,
    ScheduleDetailsComponent,
    ActionModalComponent,
    UserSearchComponent,
    ModalMapComponent,
    CodeCameraPage,
    CodeCameraTestPage,
    CheckinPage,
    ModalInputComponent,
    TabshomePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MATERIAL_COMPONENTS,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      monthNames: MONTHS,
    }),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    OnboardingPage,
    ConsultReservationsPage,
    RoomAvailabilityPage,
    CalendarComponent,
    AccountPage,
    RoomSearchResultsPage,
    ScheduleDetailsComponent,
    ActionModalComponent,
    UserSearchComponent,
    ModalMapComponent,
    CodeCameraPage,
    CodeCameraTestPage,
    CheckinPage,
    ModalInputComponent,
    TabshomePage
  ],
  providers: [
    // StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConsumeApiProvider,
    EventsManagerProvider,
    OnboardingInfoProvider,
    LocalStorageProvider,
    LocalStorageProvider,
    NativePageTransitions,
    {
      useClass: LoginMockProvider,
      provide: LoginProvider
    },
    {
      useClass: ConfigurationMockProvider,
      provide:  ConfigurationProvider
    },
    {
      useClass: MeetingMockProvider,
      provide: MeetingProvider
    },
    // LoginProvider,
    // ConfigurationProvider,
    // MeetingProvider,
    AccountProvider,
    QRScanner,
    Keyboard
  ]
})
export class AppModule {}
