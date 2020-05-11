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

  constructor(private userService: UserService, private authService: AuthService, private notifService: NotificationService, private router: Router, private courseService: CourseService) {

  }

  ngOnInit() {
    this.firstName = this.authService.currentUserValue.firstName;
    this.lastName = this.authService.currentUserValue.lastName;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  totalCourses() {
    this.courses = this.courseService.getAll();
    return this.courses.size();
  }
  save() {
    // pass
  }
}

