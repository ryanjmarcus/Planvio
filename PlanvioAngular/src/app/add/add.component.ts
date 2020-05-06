import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import {first} from "rxjs/operators";
import {PArecordService} from "../_services/parecord.service";
import {PARecord} from '../_models/PARecord';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addCalories: Number = 2000;
  addMinutes: Number = 30;
  addActivity: Number = 1;
  date: FormControl = new FormControl({ value: new Date(), disabled: false});
  addDate: Date = new Date();

  buttonName = 'Add';

  constructor(private userService: UserService, private authService: AuthService, private notifService: NotificationService, private parecordservice: PArecordService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.calories) {
        this.date = new FormControl({ value: new Date(), disabled: true});
        this.buttonName = 'Save';
        this.addCalories = params.calories;
        this.addMinutes = params.minutes
        this.addActivity = params.type;
        this.addDate = params.date;
      }
    });
  }

  createPARecord() {
    this.parecordservice.add(this.addCalories, this.addMinutes, this.addActivity, this.addDate).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif(resp, 'response');
      }, error => {
        this.notifService.showNotif(error); });
  }


}
