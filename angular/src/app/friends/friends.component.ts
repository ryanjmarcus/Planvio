import {Component, OnChanges, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {NotificationService} from "../_services/notification.service";
import {User} from '../_models/user';
import {FriendService} from "../_services/friend.service";
import {Friend} from "../_models/friend";
import {AuthService} from "../_services/auth.service";
import {Course} from "../_models/course";
import {Assignment} from "../_models/assignment";
import {CourseService} from "../_services/course.service";
import {AssignmentService} from "../_services/assignment.service";

export interface Section {
  name: string;
  updated: Date;

}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnChanges {
  friends: Friend[] = [];
  users: User[] = [];
  username;
  friendUsername;
  friendFirstName;
  friendLastName;

  assignments: Assignment[] = [];
  courses: Course[] = [];

  constructor(private userService: UserService, private notifService: NotificationService, private friendService: FriendService, private authService: AuthService,
              private courseService: CourseService, private assignmentService: AssignmentService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadAllFriends(this.username);
  }

  ngOnChanges() {
    this.loadAllAssignments(this.friendUsername);
    this.loadAllCourses(this.friendUsername);
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
        this.friendLastName = this.friends[0].lastName;
        this.loadAllAssignments(this.friendUsername);
        this.loadAllCourses(this.friendUsername);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  setSelectedFriend(username: string, firstName: string, lastName: string) {
    this.friendUsername = username;
    this.friendFirstName = firstName;
    this.friendLastName = lastName;
    this.loadAllAssignments(this.friendUsername);
    this.loadAllCourses(this.friendUsername);
  }

  private loadAllCourses(username: string) {
    console.log(username);
    this.courseService.getAll().subscribe(
      courses => {
        this.courses = courses.filter(function (course) {
          return course.username === username;
        });
        this.sortCourses();
        console.log(this.courses);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  loadAllAssignments(username: string) {
    this.assignmentService.getAll().subscribe(
      assignments => {
        this.assignments = assignments.filter(function (assignment) {
          return assignment.username === username;
        });
        this.sortAssignments();
        console.log(this.assignments);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  sortCourses() {
    this.courses.sort(this.sortCoursesHelper);
    console.log(this.courses);
  }

  sortAssignments() {
    this.assignments.sort(this.sortAssignmentsHelper);
    console.log(this.assignments);
  }

  sortAssignmentsHelper(a: Assignment, b: Assignment) {
    let a_time = a.dueTime;
    let a_date = new Date(a.dueDay);
    let a_numHours = parseInt(a_time.split(':')[0], 10);
    if (a_time.includes('PM') && a_numHours !== 12) {
      a_numHours += 12;
    }
    a_date.setHours(a_numHours);
    a_date.setMinutes(parseInt(a_time.split(':')[1].substr(0, 2), 10));

    let b_time = b.dueTime;
    let b_date = new Date(b.dueDay);
    let b_numHours = parseInt(b_time.split(':')[0], 10);
    if (b_time.includes('PM') && b_numHours !== 12) {
      b_numHours += 12;
    }
    b_date.setHours(b_numHours);
    b_date.setMinutes(parseInt(b_time.split(':')[1].substr(0, 2), 10));

    let result = a_date.getMonth() > b_date.getMonth() ? 1 : a_date.getMonth() < b_date.getMonth() ? -1 : 0;

    if(result === 0)
      result = a_date.getDate() > b_date.getDate() ? 1 : a_date.getDate() < b_date.getDate() ? -1 : 0;

    if (result === 0)
      result = a_date.getHours() > b_date.getHours() ? 1 : a_date.getHours() < b_date.getHours() ? -1 : 0;

    if(result === 0)
      result = a_date.getMinutes() > b_date.getMinutes() ? 1 : a_date.getMinutes() < b_date.getMinutes() ? -1 : 0;
    return result;
  }


  sortCoursesHelper(a: Course, b: Course) {
    let a_time = a.startTime;
    let a_date = new Date();
    let a_numHours = parseInt(a_time.split(':')[0], 10);
    if (a_time.includes('PM') && a_numHours !== 12) {
      a_numHours += 12;
    }
    a_date.setHours(a_numHours);
    a_date.setMinutes(parseInt(a_time.split(':')[1].substr(0, 2), 10));

    let b_time = b.startTime;
    let b_date = new Date();
    let b_numHours = parseInt(b_time.split(':')[0], 10);
    if (b_time.includes('PM') && b_numHours !== 12) {
      b_numHours += 12;
    }
    b_date.setHours(b_numHours);
    b_date.setMinutes(parseInt(b_time.split(':')[1].substr(0, 2), 10));

    let result = a_date.getHours() > b_date.getHours() ? 1 : a_date.getHours() < b_date.getHours() ? -1 : 0;
    if(result === 0)
      result = a_date.getMinutes() > b_date.getMinutes() ? 1 : a_date.getMinutes() < b_date.getMinutes() ? -1 : 0;
    return result;
  }


}
