import { Component, OnInit } from '@angular/core';
import {CourseService} from "../_services/course.service";
import {AssignmentService} from '../_services/assignment.service';
import {NotificationService} from "../_services/notification.service";
import {Course} from "../_models/course";
import {Assignment} from "../_models/assignment";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentWeek: Date[] = [];
  courses: Course[] = [];
  assignments: Assignment[] = [];
  username: string;
  selectedDay: Date;

  constructor(private courseService: CourseService, private notifService: NotificationService,
              private authService: AuthService, private assignmentService: AssignmentService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadAllCourses(this.username);
    this.loadAllAssignments(this.username);
    this.getCurrentWeek(new Date());
    this.selectedDay = new Date();
  }

  private loadAllCourses(username: string) {
    this.courseService.getAll().subscribe(
      courses => {
        this.courses = courses.filter(function (course) {
          return course.username === username;
        });
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
        console.log(this.assignments);

      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  changeSelectedDay(day: Date) {
    this.selectedDay = day;
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


}
