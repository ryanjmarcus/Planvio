import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {User} from "../_models/user";
import {AuthService} from "../_services/auth.service";
import {FriendService} from "../_services/friend.service";


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  username: string;

  constructor(
    private notifService: NotificationService,
    private authService: AuthService,
    private friendService: FriendService
  ) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
  }

  generateData() {
    this.friendService.add('dannytorney', 'Danny', 'Torney', 'demouser').pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Generated Data', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });
  }
}




