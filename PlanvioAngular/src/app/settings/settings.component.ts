import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  calories: Number = 0;
  minutes: Number = 0;



  constructor(private userService: UserService, private authService: AuthService, private notifService: NotificationService, private router: Router) {

  }

  ngOnInit() {
    this.userService.getGoals(this.authService.currentUserValue.username).subscribe( data => {
      console.log(data);
      this.calories = data["caloriegoal"];
      this.minutes = data["minutegoal"];
    });

  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  save() {
    console.log('Save was clicked');
    this.userService.setGoals(this.calories, this.minutes).subscribe(
      res => this.notifService.showNotif(res, 'response'),
            error => {this.notifService.showNotif(error); });
  }

}
