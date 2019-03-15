import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, Content, DateTime } from 'ionic-angular';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { ConsumeApiProvider } from '../../providers/consume-api/consume-api';
import { ACCESORIES, KEY_LOCAL_STORAGE, EMPTY_RESPONSE_SEARCH_MEETING, DAYS_NAME, HOURS } from '../../environments/enviroments';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { BuildingTableVO } from '../../interfaces/buildings.interface';
import { MeetingProvider } from '../../providers/meeting/meeting';
import { SearchMeetingRoom, SearchUser, ConfigApp } from '../../models/meeting.model';
import { DateREST } from '../../util/util';
import { RoomSearchResultsPage } from '../room-search-results/room-search-results';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { UserSearchComponent } from '../../components/user-search/user-search';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ConfigurationProvider } from '../../providers/configuration/configuration';
import { DatePickerOptions } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  quantityOfPersons:number[] = null;
  indexPersonSelected:number;
  showInputDescription:boolean = false; 
  horary:string = '';
  daysLimit:number;
  typeUser:number;
  selectedDate:Date;
  disabledBtnConsultReservation:boolean = true;

  formJustification:FormGroup;
  buildings:Array<BuildingTableVO> = new Array();
  accesories:any[] = ACCESORIES;
  userAsign:any;
  nameDays:any[] = [{}];

  section:number = 0;
  
  /** 
   * VARIABLES PARA EL CALENDARIO DE RECURRENTE
  */
 startHourList:string;
 endHourList:string;
 configApp: ConfigApp;

 minDateOfStart:string;
 maxDateOfStart:string;
 minDateOfEnd:string;
 maxDateOfEnd:string;

 @ViewChild('endDate') endDatePicker: DateTime;
 @ViewChild('endTime') endTimePicker: DateTime;
  
  constructor(public navCtrl: NavController,
              public eventsManager: EventsManagerProvider,
              public consumeApi: ConsumeApiProvider,
              public storage_provider: LocalStorageProvider,
              private meeting_provider: MeetingProvider,
              private changeDetector: ChangeDetectorRef,
              private fb: FormBuilder,
              private login_provider: LoginProvider,
              private modalCtrl: ModalController,
              private config_provider: ConfigurationProvider) {

    this.daysLimit = this.storage_provider.getItem( KEY_LOCAL_STORAGE.CONFIG_APP ).maxDaysReservation;
    this.buildings = this.storage_provider.getItem(KEY_LOCAL_STORAGE.BUILDING_TABLE_VO);         
    this.typeUser = this.storage_provider.getItem( KEY_LOCAL_STORAGE.TYPE_USER );
    this.userAsign = this.storage_provider.getItem(KEY_LOCAL_STORAGE.USER_DETAIL);

    this.formJustification = this.fb.group({
      justificationSchedule:[''],
      justificationBuilding:[''],
      userByAssigned:[''],
      specialRequirement:['']
    });

    this.eventsManager.getUser().subscribe( user => {
      this.userAsign = user;
      this.formJustification.controls['userByAssigned'].setValue(user.EmailAddress);
    });

    this.nameDays = DAYS_NAME.map( nameDay => {
      return {nameDay,selected:false}
    }).slice(1,6);

    /**
     * VARIBALES PARA LAS FECHAS LIMITES
     */
    this.configApp = this.storage_provider.getItem(KEY_LOCAL_STORAGE.CONFIG_APP);
    this.startHourList = "7,8,9,10,11,12,13,14,15,16,17,18,19";
    this.minDateOfStart = dateTimePicker(new Date());
    let endDate = new Date();
    endDate.setMonth( endDate.getMonth() + this.configApp.recursiveMonth )
    this.maxDateOfStart = dateTimePicker( endDate );

  }

  ionViewDidLoad(){
    this.eventsManager.setIsLogged( true );
    this.eventsManager.setIsLoadingEvent( false );

    console.log( this.content );

  }

  selectedPersons( index:number,quantity:number ) {
    if( this.showInputDescription ) {
      this.quantityOfPersons = this.storage_provider.getItem( KEY_LOCAL_STORAGE.CAPACITY_MEETING );    
      this.indexPersonSelected = null;
      this.showInputDescription = false;
      this.formJustification.controls['justificationBuilding'].clearValidators();
      this.formJustification.controls['justificationBuilding'].updateValueAndValidity();
      this.changeDetector.detectChanges();
      this.validateRequired();
      return;
    }    
    this.indexPersonSelected = index;
    if( quantity >= 90 ) {
      this.quantityOfPersons = [ this.quantityOfPersons[index] ];
      this.indexPersonSelected = 0;
      this.showInputDescription = true;
      this.formJustification.controls['justificationBuilding'].setValue('');
      this.formJustification.controls['justificationBuilding'].setValidators([Validators.required]);
      this.formJustification.controls['justificationBuilding'].updateValueAndValidity();
    }
    this.changeDetector.detectChanges();
    this.validateRequired();
  }

  selectedBuilding( building:BuildingTableVO ) {
    building.selected = !building.selected;
    this.validateRequired();
    this.getPersonCapacity();
  }

  selectedDay($date:Date) {
    this.selectedDate = $date;
    this.validateRequired();
  }
  
  selectedHorary(option:string) {
    this.horary = option;
    if( option === 'all' || option === 'con' ){
      this.formJustification.controls['justificationSchedule'].setValue('');
      this.formJustification.controls['justificationSchedule'].setValidators([Validators.required]);
    } else {
      this.formJustification.controls['justificationSchedule'].clearValidators();
    }
    this.formJustification.controls['justificationSchedule'].updateValueAndValidity();
    this.validateRequired();
  }

  selectedAccesorie( index:number ) {

    if( index === 7 && !this.accesories[7].selected ){
      this.formJustification.controls['specialRequirement'].setValue('');
      this.formJustification.controls['specialRequirement'].setValidators([Validators.required]);
      this.formJustification.controls['specialRequirement'].updateValueAndValidity();
    }

    if( this.accesories[7].selected ) {
      this.formJustification.controls['specialRequirement'].clearValidators();
      this.formJustification.controls['specialRequirement'].updateValueAndValidity();
    }

    this.accesories = this.accesories.map( (elemtent,i) => {
      elemtent.selected = index === i ? !elemtent.selected : elemtent.selected;
      return elemtent;
    });
    this.changeDetector.detectChanges();
  }

  consultReservation() {
    this.eventsManager.setIsLoadingEvent( true );
    let meeting = new SearchMeetingRoom(this.selectedDate); 
    meeting.blackboard = this.accesories[6].selected ? 1 : 0; 
    meeting.capacity = this.quantityOfPersons[ this.indexPersonSelected ];
    this.buildings.forEach( building => {
      if(building.selected) {
        meeting.building.push( building.id );
      }
    });
    meeting.consultingRoom = this.horary === 'con' ? 1 : 0;
    meeting.dateReservation = DateREST.getDateFormat( this.selectedDate );
    meeting.hourReservation = this.horary.toUpperCase();
    meeting.isAllDay = this.horary === 'all' ? 1 : 0;
    meeting.isAuditorium = this.quantityOfPersons[ this.indexPersonSelected ] >= 150 ? 1 : 0;
    meeting.monitor = this.accesories[4].selected ? 1 : 0;
    meeting.projector = this.accesories[3].selected ? 1 : 0;
    meeting.supplier = this.accesories[5].selected ? 1 : 0;
    meeting.telephone = this.accesories[1].selected ? 1 : 0;
    meeting.tv = this.accesories[2].selected ? 1 : 0;
    meeting.videoConference = this.accesories[0].selected ? 1 : 0;
    this.consultReservationService( meeting );
  }

  consultReservationService( meeting:SearchMeetingRoom ) {
    this.meeting_provider
        .searchRoomForReservation(meeting)
        .subscribe( (response:any) => {
          let listRoom:any[] = response.businessResponse.data.resultMeetingRoomSearchVO;
          if( listRoom === null || listRoom.length === 0) {
            this.eventsManager.setGeneralNotificationMessage( EMPTY_RESPONSE_SEARCH_MEETING );
          } else{
            let justification = `${this.formJustification.controls['justificationSchedule'].value} ${this.formJustification.controls['justificationBuilding'].value}`;
            let specialRequirement = this.formJustification.controls['specialRequirement'].value;
            let userReservation = this.userAsign;
            this.navCtrl.push( RoomSearchResultsPage,{listRoom,meeting,dateSelected:this.selectedDate,justification,userReservation,specialRequirement});
          }
        }, (error:any) => {
          console.log( error );
        });
  }

  validateRequired(){
    if( !this.selectedDate ){
      this.disabledBtnConsultReservation = true;
      return;
    }
    if( this.horary === '' ){
      this.disabledBtnConsultReservation = true;
      return;
    }
    if( this.buildings.filter( building => building.selected ).length === 0 ){
      this.disabledBtnConsultReservation = true;
      return;
    }
    if( this.indexPersonSelected == null ) {
      this.disabledBtnConsultReservation = true;
      return;
    }
    this.disabledBtnConsultReservation = false;
  }

  searchUser() {
    this.eventsManager.setIsLoadingEvent( true );
    let userDomainMX = new SearchUser();
    userDomainMX.userDomain = 'mx';
    userDomainMX.userName = this.formJustification.controls['userByAssigned'].value;
    let usersMX = this.login_provider.searchUserByLoginUser( userDomainMX );
    let userDomainCAM = new SearchUser();
    userDomainCAM.userDomain = 'cam';
    userDomainCAM.userName = this.formJustification.controls['userByAssigned'].value;
    let userCAM = this.login_provider.searchUserByLoginUser( userDomainCAM );
    let userDomainHome = new SearchUser();
    userDomainHome.userDomain = 'homeoffice';
    userDomainHome.userName = this.formJustification.controls['userByAssigned'].value;
    let userHomeOffice = this.login_provider.searchUserByLoginUser( userDomainHome );
    
    forkJoin( [usersMX,userCAM,userHomeOffice] ).subscribe( usersDomainResponse => {
      let users:any[] = [];
      users = usersDomainResponse[0].concat(usersDomainResponse[1]).concat(usersDomainResponse[2]);
      const modalUsers = this.modalCtrl.create(UserSearchComponent,{users});
      modalUsers.present();
    },error => {
      console.log( error );
      this.eventsManager.setIsLoadingEvent(false);
    });

  }

  getPersonCapacity() {
    this.eventsManager.setIsLoadingEvent( true );
    let listIdBuildings = [];
    this.buildings.forEach( building => {
      if(building.selected) {
        listIdBuildings.push( building.id );
      }
    });
    if( listIdBuildings.length > 0 ) {
      this.config_provider
          .getCapacityMeeting(listIdBuildings)
          .subscribe( response => {
            this.quantityOfPersons = response;
            this.storage_provider.saveItem( KEY_LOCAL_STORAGE.CAPACITY_MEETING,response )
            this.eventsManager.setIsLoadingEvent( false );
          }, error => {
            console.log( error );
            this.eventsManager.setIsLoadingEvent( false );
          });
    } else {
      this.quantityOfPersons = null;
      this.eventsManager.setIsLoadingEvent( false );
    }
  }

  goSection( section:number ) {
    this.section = section;
  }

  swipe($event) {
    if($event.direction === 2) {
      this.section = 1;
    }
    if($event.direction === 4) {
      this.section = 0;
    }
  }

  selectedDayRecurrent( day ) {
    day.selected = !day.selected;
    let a: DatePickerOptions
  }

  /**
   *  LOGICA PARA EL RANGO DE FECHAS
   */

  selectedStartHour( horary ) {
    let hours = this.startHourList.split(',');
    this.endHourList = hours.filter( hour => hour >= horary.hour )
                        .splice(0,(this.configApp.reservationMaxTime + 1) )
                        .join(',');
    this.endTimePicker.value = null;
  }

  selectedStartDate( startDate ) {
    this.minDateOfEnd = dateTimePicker( new Date(startDate.year,(startDate.month-1),startDate.day) );
    let endDate = new Date();
    endDate.setMonth( endDate.getMonth() + this.configApp.recursiveMonth );
    this.maxDateOfEnd = dateTimePicker(endDate);
    this.endDatePicker.value = null;
  }
  

}

const dateTimePicker = (date: Date) => {
  let month = date.getUTCMonth().toString().length === 1 ? `0${date.getUTCMonth()+1}` : `${date.getUTCMonth()+1}`;
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
}
