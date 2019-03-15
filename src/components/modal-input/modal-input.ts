import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';

@Component({
  selector: 'modal-input',
  templateUrl: 'modal-input.html'
})
export class ModalInputComponent {

  showKeyboard:boolean = false;
  title:string;
  placeholder:string;
  text:string = '';

  constructor( private viewCtrl: ViewController,
    private keyboard: Keyboard,
    private navParams: NavParams,
    private events_manager: EventsManagerProvider ) {
      this.title = this.navParams.get('title');
      this.placeholder = this.navParams.get('placeholder') ? this.navParams.get('placeholder') : '' ;
      this.keyboard.onKeyboardWillShow().subscribe( () => this.showKeyboard = true );
      this.keyboard.onKeyboardWillHide().subscribe( () => this.showKeyboard = false );
  }

  close() {
    this.viewCtrl.dismiss();
  }

  send() {
    if( this.text.trim() != ''  ) {
      this.events_manager.setMessageInputModal( this.text );
      this.viewCtrl.dismiss();
    }
  }

}
