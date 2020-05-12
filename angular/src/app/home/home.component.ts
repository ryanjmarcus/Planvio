import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {User} from "../_models/user";
import {AuthService} from "../_services/auth.service";
import {FriendService} from "../_services/friend.service";
import {CourseService} from "../_services/course.service";


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  username: string;
  date;
  firstName;
  lastName;
  friends;
  courses;


  bgColor = 'pink';
  color = 'white';
  isCircular = true;

  constructor(
    private notifService: NotificationService,
    private authService: AuthService,
    private friendService: FriendService,
    private courseService: CourseService,
  ) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.firstName = this.authService.currentUserValue.firstName;
    this.lastName = this.authService.currentUserValue.lastName;
    this.date = Date();
  }

  generateData() {

    // Add Friends

    this.friendService.add('dannytorney', 'Danny', 'Torney', 'demo').pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Friend', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.friendService.add('ryanmarcus', 'Ryan', 'Marcus', 'demo').pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Friend', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    // Add Courses

    this.courseService.add('CS 3754: Cloud Software Development', [true, false, true, false, false], '11:00 AM', '12:15 PM', 'Andrey Esakia', encodeURIComponent('http://people.cs.vt.edu/~esakia/img/profile.jpg'), 'demo', this.date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 3714: Mobile Software Development', [false, true, false, true, false], '10:00 AM', '11:25 AM', 'Osman Balci', encodeURIComponent('https://manta.cs.vt.edu/balci/Site/logo/OsmanBalci.jpg'), 'demo', this.date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 3724: Human Comp Interaction', [true, false, true, false, false], '4:00 PM', '5:15 PM', 'Andrew Kulak', encodeURIComponent('https://www.andrewkulak.com/images/avatar.jpg'), 'demo', this.date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('MATH 3134: Applied Combinatorics', [false, true, false, true, false], '2:00 PM', '3:15 PM', 'Steve Hammer', encodeURIComponent('https://www.math.vt.edu/content/math_vt_edu/en/people/faculty/hammer-steve/jcr:content/bio-image.transform/xl-medium/image.jpg'), 'demo', this.date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 3604: Intro to Professionalism', [true, false, true, false, false], '2:30 PM', '3:45 PM', 'Scott McCrickard', encodeURIComponent('http://people.cs.vt.edu/~mccricks/images/mccrickard-small.jpg'), 'demo', this.date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 2506: Intro to Computer Org II', [true, false, true, false, true], '1:25 PM', '2:15 PM', 'William McQuain', encodeURIComponent('http://people.cs.vt.edu/~mcquain/mcquainSmall.jpg'), 'demo', this.date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });
  }
}




