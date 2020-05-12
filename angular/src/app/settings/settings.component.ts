import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import {Router} from '@angular/router';
import {CourseService} from '../_services/course.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  firstName;
  lastName;
  friends;
  courses;

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private authService: AuthService, private notifService: NotificationService, private router: Router, private courseService: CourseService) {

  }

  ngOnInit() {
    this.firstName = this.authService.currentUserValue.firstName;
    this.lastName = this.authService.currentUserValue.lastName;
    this.courses = this.courseService.getAll().subscribe(
      courses => {
        this.courses = courses.filter(function(course) {
          return course.username === this.authService.currentUserValue.username;
        });
        console.log(this.courses);

      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  save() {
    // pass
  }
}

