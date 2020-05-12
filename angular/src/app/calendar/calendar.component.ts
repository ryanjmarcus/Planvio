import {Component, OnChanges, OnInit} from '@angular/core';
import {CourseService} from "../_services/course.service";
import {AssignmentService} from '../_services/assignment.service';
import {NotificationService} from "../_services/notification.service";
import {Course} from "../_models/course";
import {Assignment} from "../_models/assignment";
import {AuthService} from "../_services/auth.service";
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {

  currentWeek: Date[] = [];
  courses: Course[] = [];
  assignments: Assignment[] = [];
  username: string;
  selectedDay: Date;

  constructor(private courseService: CourseService, private notifService: NotificationService,
              private authService: AuthService, private assignmentService: AssignmentService) {
  }

  ngOnInit() {
    this.loadAllCourses(this.username);
    this.loadAllAssignments(this.username);
    this.getCurrentWeek(new Date());
    this.selectedDay = new Date();
    this.username = this.authService.currentUserValue.username;
  }

  ngOnChanges() {
    this.sortAssignments();
    this.sortCourses();
  }

  private loadAllCourses(username: string) {
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

  deleteAssignment(assign: Assignment) {
    this.assignmentService.delete(assign).pipe(first()).subscribe( () => {
      this.assignments = null;
      this.loadAllAssignments(this.username);
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

  changeSelectedDay(day: Date) {
    this.selectedDay = day;
  }

  equalDays(day1: Date, day2: Date) {
    const day_1 = new Date(day1);
    const day_2 = new Date(day2);
    return day_1.toDateString() === day_2.toDateString();
  }

  nextWeek() {
    this.getCurrentWeek(this.selectedDay.setDate(this.selectedDay.getDate() + 7));
    this.selectedDay = this.currentWeek[0];
  }

  previousWeek() {
    this.getCurrentWeek(this.selectedDay.setDate(this.selectedDay.getDate() - 7));
    this.selectedDay = this.currentWeek[0];
  }

  currentMonthTitle() {
    let title: string;
    title = this.currentWeek[0].toLocaleDateString('en', { month: 'short' });
    if (this.currentWeek[6].getMonth() !== this.currentWeek[0].getMonth()) {
      title += ' - ';
      title += this.currentWeek[6].toLocaleDateString('en', { month: 'short' });
    }
    title += ' ' + this.currentWeek[6].getFullYear();
    return title;
  }

  private getSunday(d, x) {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day;
    return new Date(d.setDate(diff + x));
  }

  private getCurrentWeek(d) {
    let i;
    for (i = 0; i < 7; i++) {
      this.currentWeek[i] = this.getSunday(d, i);
    }
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
    let a_date = new Date();
    let a_numHours = parseInt(a_time.split(':')[0], 10);
    if (a_time.includes('PM') && a_numHours !== 12) {
      a_numHours += 12;
    }
    a_date.setHours(a_numHours);
    a_date.setMinutes(parseInt(a_time.split(':')[1].substr(0, 2), 10));

    let b_time = b.dueTime;
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
