import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {User} from "../_models/user";
import {AuthService} from "../_services/auth.service";
import {FriendService} from "../_services/friend.service";
import {CourseService} from "../_services/course.service";
import {AssignmentService} from "../_services/assignment.service";


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  username: string;
  date;
  firstName;
  lastName;
  friends;
  courses;
  showButton;


  bgColor = 'cornflowerblue';
  color = 'white';
  isCircular = true;

  constructor(
    private notifService: NotificationService,
    private authService: AuthService,
    private friendService: FriendService,
    private courseService: CourseService,
    private assignmentService: AssignmentService
  ) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.firstName = this.authService.currentUserValue.firstName;
    this.lastName = this.authService.currentUserValue.lastName;
    this.date = Date();

    this.showButton = (this.username === 'johnsmith');

  }

   generateData() {
    // Add Friends

     this.friendService.add('dannytorney', 'Danny', 'Torney', this.username).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Friend', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.friendService.add('ryanmarcus', 'Ryan', 'Marcus', this.username).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Friend', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    // Add Courses

    this.courseService.add('CS 3754: Cloud Software Development', [true, false, true, false, false], '11:00 AM', '12:15 PM', 'Andrey Esakia', encodeURIComponent('http://people.cs.vt.edu/~esakia/img/profile.jpg'), this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 3714: Mobile Software Development', [false, true, false, true, false], '10:00 AM', '11:25 AM', 'Osman Balci', encodeURIComponent('https://manta.cs.vt.edu/balci/Site/logo/OsmanBalci.jpg'), this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 3724: Human Comp Interaction', [false, true, false, true, false], '4:00 PM', '5:15 PM', 'Andrew Kulak', encodeURIComponent('https://www.andrewkulak.com/images/avatar.jpg'), this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('MATH 3134: Applied Combinatorics', [false, true, false, true, false], '2:00 PM', '3:15 PM', 'Steve Hammer', encodeURIComponent('https://www.math.vt.edu/content/math_vt_edu/en/people/faculty/hammer-steve/jcr:content/bio-image.transform/xl-medium/image.jpg'), this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 3604: Intro to Professionalism', [true, false, true, false, false], '2:30 PM', '3:45 PM', 'Scott McCrickard', encodeURIComponent('http://people.cs.vt.edu/~mccricks/images/mccrickard-small.jpg'), this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.courseService.add('CS 2506: Intro to Computer Org II', [true, false, true, false, true], '1:25 PM', '2:15 PM', 'William McQuain', encodeURIComponent('http://people.cs.vt.edu/~mcquain/mcquainSmall.jpg'), this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Course', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    // Add Assignments

    const dateOne = new Date();

    this.assignmentService.add('Binary Bomb', dateOne, '8:00 PM', 'CS 2506: Intro to Computer Org II', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.assignmentService.add('Final Group Deliverable', dateOne, '1:45 PM', 'CS 3754: Cloud Software Development', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.assignmentService.add('Final Exam', dateOne, '11:55 PM', 'CS 3724: Human Comp Interaction', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    const dateTwo = new Date();
    dateTwo.setDate(dateOne.getDate() + 1);

    this.assignmentService.add('Final App Design', dateTwo, '11:55 PM', 'CS 3714: Mobile Software Development', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.assignmentService.add('Test 3: Graph Theory', dateTwo, '8:00 PM', 'MATH 3134: Applied Combinatorics', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.assignmentService.add('Final Ethics Write-Up', dateTwo, '11:00 PM', 'CS 3604: Intro to Professionalism', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    const dateThree = new Date();
    dateThree.setDate(dateTwo.getDate() + 1);

    this.assignmentService.add('Tutorial 14: iOS MapKit', dateThree, '2:00 PM', 'CS 3714: Mobile Software Development', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    this.assignmentService.add('Planv.io UML Diagram', dateThree, '5:00 PM', 'CS 3754: Cloud Software Development', this.username, new Date()).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Added Assignment', 'response');
      }, error => {
        this.notifService.showNotif(error);
      });

    // Add Danny courses

     this.courseService.add('CS 3754: Cloud Software Development', [true, false, true, false, false], '11:00 AM', '12:15 PM', 'Andrey Esakia', encodeURIComponent('http://people.cs.vt.edu/~esakia/img/profile.jpg'), 'dannytorney', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.courseService.add('MUS 1114: Music Theory Fundamentals', [false, true, false, true, false], '1:00 PM', '2:25 PM', 'Easter Wallace', encodeURIComponent('https://www.performingarts.vt.edu/images/uploads/faculty-staff/Wallace_Easter2015-1.jpg'), 'dannytorney', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.courseService.add('MATH 1226: Principles of Calculus II', [false, true, false, true, false], '3:00 PM', '4:15 PM', 'Cameron Withrow', encodeURIComponent('https://www.math.vt.edu/content/math_vt_edu/en/people/faculty/withrow-camron/jcr:content/bio-image.transform/xl-medium/image.jpg'), 'dannytorney', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     // Add Danny assignments

     this.assignmentService.add('Music Quiz 14: Pitches', dateOne, '11:00 PM', 'MUS 1114: Music Theory Fundamentals', 'dannytorney', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.assignmentService.add('Final Exam MC', dateOne, '8:30 PM', 'MATH 1226: Principles of Calculus II', 'dannytorney', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.assignmentService.add('Planvio UML Diagram', dateTwo, '11:55 PM', 'CS 3754: Cloud Software Development', 'dannytorney', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     // Add Sarah Courses

     this.courseService.add('CS 3754: Cloud Software Development', [true, false, true, false, false], '11:00 AM', '12:15 PM', 'Andrey Esakia', encodeURIComponent('http://people.cs.vt.edu/~esakia/img/profile.jpg'), 'sarahpeyton', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.courseService.add('CS 3714: Mobile Software Development', [false, true, false, true, false], '10:00 AM', '11:25 AM', 'Osman Balci', encodeURIComponent('https://manta.cs.vt.edu/balci/Site/logo/OsmanBalci.jpg'), 'sarahpeyton', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.courseService.add('GEOG 1014: Intro to African Studies', [false, true, false, true, false], '2:00 PM', '3:15 PM', 'John Boyer', encodeURIComponent('https://geography.vt.edu/content/dam/geography_vt_edu/Boyer-final.jpg'), 'sarahpeyton', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     //
     this.assignmentService.add('Tutorial 13: iOS NavigationView', dateOne, '8:00 PM', 'CS 3714: Mobile Software Development', 'sarahpeyton', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.assignmentService.add('Final Group Deliverable', dateOne, '1:45 PM', 'CS 3754: Cloud Software Development', 'sarahpeyton', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.assignmentService.add('African Map Assignment', dateTwo, '11:55 PM', 'GEOG 1014: Intro to African Studies', 'sarahpeyton', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });


     // Add Ryan Courses


     this.courseService.add('COMM 2004: Public Speaking', [false, true, false, true, false], '9:00 AM', '10:15 AM', 'Claire Boor', encodeURIComponent('https://liberalarts.vt.edu/content/liberalarts_vt_edu/en/departments-and-schools/department-of-communication/faculty/claire-hall/jcr:content/content/vtcontainer_13130399/vtcontainer-content/vtmulticolumn/vt-items_0/adaptiveimage.transform/xl-medium/image.jpg'), 'ryanmarcus', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.courseService.add('MATH 4705: Stat for Engineers', [true, false, true, false, true], '8:00 AM', '8:50 AM', 'Xinwei Deng', encodeURIComponent('https://www.stat.vt.edu/content/stat_vt_edu/en/people/stat-faculty/jcr:content/content/vtmulticolumn/vt-items_0/adaptiveimage.transform/l-medium/image.jpg'), 'ryanmarcus', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Course', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     // Add Ryan Assignments

     this.assignmentService.add('Probability Assignment', dateOne, '9:30 PM', 'MATH 4705: Stat for Engineers', 'ryanmarcus', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });

     this.assignmentService.add('Speech 5: Life Story ', dateTwo, '9:00 AM', 'COMM 2004: Public Speaking', 'ryanmarcus', new Date()).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Added Assignment', 'response');
       }, error => {
         this.notifService.showNotif(error);
       });






  }
}




