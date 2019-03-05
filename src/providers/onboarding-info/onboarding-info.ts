import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the OnboardingInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OnboardingInfoProvider {

  onboardIngInfo = [
    {
      title:'Reserva salas corporativas',
      info:'Reserva salas en los diferentes corporativos',
      img:'assets/imgs/onboarding/onboarding_1.jpg'
    },
    {
      title:'Notificaciones de tus reservas',
      info:'Recibe el status de la reservación de tu sala',
      img:'assets/imgs/onboarding/onboarding_2.jpg'
    },
    {
      title:'Consulta la disponibilidad',
      info:'Puedes saber si la sala que quieres, está en un horario disponible',
      img:'assets/imgs/onboarding/onboarding_3.jpg'
    },
    {
      title:'Haz check de tu sala',
      info:'Con la cámara de tu smartphone, podrás hacer check-in justo antes de entrar a la sala',
      img:'assets/imgs/onboarding/onboarding_4.jpg'
    },
    {
      title:'Administra reservaciones',
      info:'Podrás administrar las reservaciones previas que tengas y editarlas, elimininarlas, hacer check in ver como se llega a la sala o reportar fallos en la misma',
      img:'assets/imgs/onboarding/onboarding_5.jpg'
    },
    {
      title:'Menu de navegación',
      // info:'',
      img:'assets/imgs/onboarding/onboarding_6.jpg'
    },

  ]

  constructor(public http: HttpClient) {
    console.log('Hello OnboardingInfoProvider Provider');
  }

  getInfoOnboarding() {
    return of(this.onboardIngInfo);
  }


}
