import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap, min} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';


import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {AuthService} from '../_services/auth.service';
import {HomeComponent} from '../home/home.component';



export interface UserData {
  username: string;
  first: string;
  last: string;
  avgcalories: number;
  avgminutes: number;
  calgoal: number;
  minutegoal: number;
}


@Component({ templateUrl: 'rankings.component.html' ,

  styleUrls: ['rankings.component.css']})
export class RankingsComponent implements OnInit {

  userRecordsWithout: UserData[] = [];
  userRecords: UserData[] = [];
  users: User[] = [];
  calColor = 'primary';
  minColor = 'warn';

  bgColor = 'pink';
  color = 'white';
  isCircular = true;


  constructor(
    private parecordservice: PArecordService,
    private notifService: NotificationService,
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {

    this.loadAllUsers();
  }

  private getBgColor(index: number, username: string) {
    const colors = ['#FF33FF',
      '#E6B333', '#3366E6', '#999966', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    if (username === this.authService.currentUserValue.username) {
      return '#FF6633';
    }

    return colors[index];
  }


  private loadAllUsers() {
    this.userService.getAll().subscribe(
      users => {
        this.users = users;
        console.log('This is the array of users for testing purposes:')
        console.log(users);
        this.users.forEach(user => {
          this.getRecordsByUsername(user);
        });
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  private getRecordsByUsername(user: User) {

    this.parecordservice.getAll().subscribe(
      parecords => {

        const filterRecords = parecords.filter(function(parecord) {
          return parecord.createdBy === user.username;

        });
        this.getUserDataAddToRecord(user, filterRecords);
  });
  }

  private getUserDataAddToRecord(user: User, records: PARecord[]) {

    let userAvgCals = 0;
    let userAvgMins = 0;

    const calGoalArray = [];
    const minGoalArray = [];

    const getAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    if (records.length > 0) {
      records.forEach(record => {
        calGoalArray.push(record.calories);
        minGoalArray.push(record.minutes);
      });
      userAvgCals = getAvg(calGoalArray);
      userAvgMins = getAvg(minGoalArray);
    }

    const userData: UserData = {
      username: user.username,
      first: user.firstName,
      last: user.lastName,
      avgcalories: userAvgCals,
      avgminutes: userAvgMins,
      calgoal: user.caloriegoal,
      minutegoal: user.minutegoal
    };

    this.userRecords.push(userData);
    // tslint:disable-next-line:max-line-length
    this.userRecords.sort((a, b) => (a.avgcalories < b.avgcalories) ? 1 : (a.avgcalories === b.avgcalories) ? ((a.avgminutes < b.avgminutes) ? 1 : -1) : -1 );

  }


}




