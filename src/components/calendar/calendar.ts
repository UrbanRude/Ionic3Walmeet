import { Component, Input, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { DAYS_NAME, MONTHS } from '../../environments/enviroments';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit{
  
  @ViewChild(Slides) slides: Slides;
  @Input('days-limit') daysLimit:number;
  @Input('textLabel') textLabel:string = 'Fecha';
  @Input('require') require:boolean = true;
  @Output('selected-day') selectDay:EventEmitter<Date> = new EventEmitter<Date>();
  
  nameDays: string[] = [];
  month:string;
  year:number;
  numberMonth:number;
  fristDays:any[] = [];
  limitDate:Date = new Date();
  weeks:any[] = [];
  
  positionSelectedDay:number;
  positionIndexSlide:number;
  realIndexSlide:number = 0;

  constructor() {
    this.nameDays = DAYS_NAME;
  }
  
  ngOnInit(){
    this.limitDate.setDate( this.limitDate.getDate() + this.daysLimit );
    this.getDaysWeek();
    this.getNextWeeks();
    this.slides
        .ionSlideWillChange
        .asObservable()
        .subscribe( data => {
          let week:Date[] = this.weeks[data.realIndex];
          let day:Date = week[ week.length - 1 ];
          this.numberMonth = day.getMonth();
          this.month = MONTHS[ day.getMonth() ];
          this.year = day.getFullYear();
          this.realIndexSlide = this.slides.realIndex;
        });
  }

  getDaysWeek() {
    var numberDayWeek = new Date().getDay();
    var count = numberDayWeek;
    var plusDays = 1;
    for( let day = 0; day <= 6; day++ ) {
        let currentDate = new Date();
        if( day < count ) {
          currentDate.setDate( currentDate.getDate() - numberDayWeek );
          this.fristDays.push( currentDate );
          numberDayWeek -= 1;    
        }
        if( day == count ) {
          this.fristDays.push( currentDate );
        }
        if( day > count  ) {
          currentDate.setDate( currentDate.getDate() + plusDays );
          this.fristDays.push( currentDate );
          plusDays += 1;
        }
    }
    this.weeks.push( this.fristDays );
    this.numberMonth = this.fristDays[this.fristDays.length - 1].getMonth();
    this.year = this.fristDays[this.fristDays.length - 1].getFullYear();
    this.month = MONTHS[ this.fristDays[this.fristDays.length - 1].getMonth() ];
  }

  getNextWeeks() {
    var days:any[] = [];
    var lastDay:Date = this.fristDays[ this.fristDays.length - 1 ];
    while( this.limitDate > lastDay  ){
      for( let i = 1; i <= 7; i++ ) {
        let date = new Date( lastDay ); 
        date.setDate( date.getDate() + i );
        days.push( date );
      }
      lastDay = days[ days.length - 1 ];
      this.weeks.push( days );
      days = [];
    }
  }

  toDay( date:Date ) {
    let toDay = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    let currentDate:any = new Date();
    currentDate = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    return toDay === currentDate;
  }

  availableDay( date:Date ) {
    return date.getMonth() === this.numberMonth; 
  }

  selectedDay(day:Date,index:number) {
    if( day <= this.limitDate && this.limitDate >= day ){
      this.positionIndexSlide = this.slides.realIndex;
      this.positionSelectedDay = index;
      this.selectDay.emit( day );
    }
  }

}
