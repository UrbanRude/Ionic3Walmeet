import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';

/**
 * Generated class for the ActionModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'action-modal',
  templateUrl: 'action-modal.html'
})
export class ActionModalComponent {

  timer:any;
  imgAction:string;
  constructor( private navCtrl: NavController,private navParams: NavParams,private events_manager: EventsManagerProvider ) {
    this.imgAction = this.navParams.get('imgAction');
  }

  ionViewDidLoad(){
  }

  ionViewDidLeave(){
  }

  closeModal() {
    clearTimeout( this.timer );
    this.navCtrl.pop();
  }

}
