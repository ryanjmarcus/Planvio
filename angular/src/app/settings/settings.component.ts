import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import {Router} from '@angular/router';
import {CourseService} from '../_services/course.service';
import {FriendService} from '../_services/friend.service';
import {AssignmentService} from '../_services/assignment.service';

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
  username;
  assignments;

  friendUsername;
  friendFirstName;
  friendLastName;

  bgColor = 'pink';
  color = 'white';
  isCircular = true;

  // tslint:disable-next-line:max-line-length
  constructor(private asService: AssignmentService,private userService: UserService, private authService: AuthService, private notifService: NotificationService, private router: Router, private courseService: CourseService, private friendService: FriendService) {

  }

  ngOnInit() {
    this.firstName = this.authService.currentUserValue.firstName;
    this.lastName = this.authService.currentUserValue.lastName;
    this.username = this.authService.currentUserValue.username;

    this.loadAllAssignments(this.username);
    this.loadAllCourses(this.username);
    this.loadAllFriends(this.username);

    this.bgColor = 'pink';
    this.color = 'white';
    this.isCircular = true;
    }

    loadAllCourses(username: string) {
      this.courseService.getAll().subscribe(
        courses => {
          // tslint:disable-next-line:only-arrow-functions
          this.courses = courses.filter(function(course) {
            return course.username === username;
          });
          console.log(this.courses);

        },
        error => {
          this.notifService.showNotif(error.toString(), 'warning');
        });
    }
  loadAllAssignments(username: string) {
    this.asService.getAll().subscribe(
      assignments=> {
        // tslint:disable-next-line:only-arrow-functions
        this.assignments = assignments.filter(function(assignment) {
          return assignment.username === username;
        });
        console.log(this.courses);

      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }
  loadAllFriends(username: string) {
    this.friendService.getAll().subscribe(
      friends => {
        this.friends = friends.filter(function (friend) {
          return friend.addedBy === username;
        });
        console.log(this.friends);
        this.friendUsername = this.friends[0].username;
        this.friendFirstName = this.friends[0].firstName;
        for (const x of this.friendLastName = this.friends[0].lastName) {

        };

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

