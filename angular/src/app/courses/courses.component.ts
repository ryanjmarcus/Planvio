import {Component, OnInit} from '@angular/core';
import {CourseService} from "../_services/course.service";
import {NotificationService} from "../_services/notification.service";
import {Course} from "../_models/course";
import {AuthService} from "../_services/auth.service";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  username: string;
  courseNumbers: number[];

  constructor(private courseService: CourseService, private notifService: NotificationService, private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadAllCourses(this.username);

  }

  deleteCourse(course: Course) {
    console.log(course);
    this.courseService.delete(course).pipe(first()).subscribe( () => {
      this.courses = null;
      this.loadAllCourses(this.username);
    });
  }

  loadAllCourses(username: string) {
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

}
