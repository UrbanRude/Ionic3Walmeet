import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

/**
 * Generated class for the ModalMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-map',
  templateUrl: 'modal-map.html'
})
export class ModalMapComponent {

  mapBase64:string;

  constructor( private navParams: NavParams, private navCtrl: NavController ) {
    this.mapBase64 = this.navParams.get('mapBase64');
  }

  cancel() {
    this.navCtrl.pop();
  }


}
