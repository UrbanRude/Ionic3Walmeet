import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { ConsultReservationsPage } from '../consult-reservations/consult-reservations';


@Component({
  selector: 'page-tabshome',
  templateUrl: 'tabshome.html',
})
export class TabshomePage {

  tab1Root = HomePage;
  tab2Root = ConsultReservationsPage;

  constructor() {
  }

  ionViewDidLoad() {
  }

}
