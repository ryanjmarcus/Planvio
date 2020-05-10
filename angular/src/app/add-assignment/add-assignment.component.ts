import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormControl} from '@angular/forms';
import {CourseService} from '../_services/course.service';
import {NotificationService} from "../_services/notification.service";
import {AuthService} from "../_services/auth.service";
import {AssignmentService} from '../_services/assignment.service';
import {User} from "../_models/user";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  assignmentForm;
  dueDay: FormControl = new FormControl({value: new Date(), disabled: false});
  buttonName = 'Add';
  courses;
  username;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService, private assignmentService: AssignmentService, private notifService: NotificationService, private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.courses = this.loadAllCourses(this.username);

    this.assignmentForm = this.formBuilder.group({
      title: [''],
      courseTitle: [''],
      dueTime: ['']

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

  createAssignment() {
    console.log(this.assignmentForm.value);
    console.log(this.dueDay.value);

    this.assignmentService.add(this.assignmentForm.value.title, this.dueDay.value, this.assignmentForm.value.dueTime, this.assignmentForm.value.courseTitle, this.username).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif(resp, 'response');
      }, error => {
        this.notifService.showNotif(error);
      });
  }
}
