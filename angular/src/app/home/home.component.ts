import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';
import {UserService} from '../_services/user.service';
import {User} from "../_models/user";
import {AuthService} from "../_services/auth.service";


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {



  parecords: PARecord[] = [];
  username: string;

  constructor(
    private parecordservice: PArecordService,
    private notifService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadAllPArecords(this.username);
      }


   private loadAllPArecords(username: string) {
    this.parecordservice.getAll().subscribe(
         parecords => {

           this.parecords =  parecords.filter(function(parecord) {
             return parecord.createdBy === username;
           });


         },
        error => {
            this.notifService.showNotif(error.toString(), 'warning'); });
  }


  deletePARecord(date) {


    // this.userService.deleteActivity(date);
    this.parecordservice.delete(date).pipe(first()).subscribe( () => { this.parecords = null;
                                                                       this.loadAllPArecords(this.username);
    });
  }

}

