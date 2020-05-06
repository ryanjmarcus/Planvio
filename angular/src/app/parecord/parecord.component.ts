import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PARecord} from '../_models/PARecord';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services/auth.service';
import {RouterModule} from "@angular/router";


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'parecord-component',
  templateUrl: './parecord.component.html',
  styleUrls: ['./parecord.component.css']
})
export class ParecordComponent implements OnInit {
  @Input() parecord: PARecord;
  @Output() deleteEvent = new EventEmitter<Date>();

   mode = 'determinate';

   bufferValue = 0;

   activities = ['directions_walk', 'directions_run', 'directions_bike'];


   calColor = 'warn';
   minColor = 'primary'


   activity = this.activities[0];
   calprogressvalue: Number = 50;
   minprogressvalue: Number = 50;

  constructor(private notifService: NotificationService, private userService: UserService, private authService: AuthService) { }

  delete(date) {
    this.deleteEvent.emit(date);
  }

  notImplemented(message) {

    this.notifService.notImplementedWarning(message);
  }

  // @ts-ignore
  ngOnInit() {

    this.activity = this.activities[this.parecord.activityType];
    // TODO:  use userService to get the goal values corresponding the username that created the parecord and then use the obtained values to properly visualize the progress towards the goal.
    this.userService.getGoals(this.authService.currentUserValue.username).subscribe(
       data => {
         this.calprogressvalue = this.parecord.calories / data["caloriegoal"] * 100;
         this.minprogressvalue = this.parecord.minutes / data["minutegoal"] * 100;
      });




  }



}
