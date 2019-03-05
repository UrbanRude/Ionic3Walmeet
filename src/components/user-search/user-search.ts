import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';

/**
 * Generated class for the UserSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-search',
  templateUrl: 'user-search.html'
})
export class UserSearchComponent {

  users:any[];

  constructor( private navParams: NavParams,
    private navCtrl: NavController,
    private events_manager: EventsManagerProvider ) {
    this.users = this.navParams.get( 'users' );
    console.log( this.users );
  }

  ionViewDidLoad(){
   this.events_manager.setIsLoadingEvent( false );
  }

  cancel() {
    this.navCtrl.pop();
  }

  selectUser( user ) {
    this.events_manager.setUser( user );
    this.navCtrl.pop();
  }

}
