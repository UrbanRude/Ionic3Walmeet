import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { OnboardingInfoProvider } from '../../providers/onboarding-info/onboarding-info';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  @ViewChild(Slides) slides: Slides;
  onboardingInfoArray:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private local_storage: LocalStorageProvider,
    private onboardingInfo: OnboardingInfoProvider) {
      this.onboardingInfo
        .getInfoOnboarding()
        .subscribe( (data:any[]) => {
          this.onboardingInfoArray = data;
          
        }, error => {

        }, () => {

        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  skipOnboarding(){
    let objeto = {view:true};
    this.local_storage.saveItem('onboarding',objeto);
    this.navCtrl.setRoot(HomePage);

  }

  nextSlide(){
    this.slides.slideNext();
  }

}