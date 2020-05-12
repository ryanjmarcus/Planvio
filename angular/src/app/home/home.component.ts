import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {User} from "../_models/user";
import {AuthService} from "../_services/auth.service";


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  username: string;

  constructor(
    private notifService: NotificationService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
  }
}




