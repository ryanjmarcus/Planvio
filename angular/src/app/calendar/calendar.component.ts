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

  constructor(private courseService: CourseService, private notifService: NotificationService, private authService: AuthService, private assignmentService: AssignmentService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadAllCourses(this.username);
    this.loadAllAssignments(this.username);
    this.getCurrentWeek(new Date());
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



  private getMonday(d, x) {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff + x));
  }

  private getCurrentWeek(d) {
    let i;
    for (i = 0; i < 5; i++) {
      this.currentWeek[i] = this.getMonday(d, i);
    }
  }


}
