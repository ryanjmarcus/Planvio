import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormControl} from '@angular/forms';
import {CourseService} from '../_services/course.service';
import {Course} from '../_models/course';
import {NotificationService} from "../_services/notification.service";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  assignmentForm
  dueDay: FormControl = new FormControl({ value: new Date(), disabled: false});
  buttonName = 'Add';
  courses;
  username;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService, private notifService: NotificationService, private authService: AuthService) { }

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
  }
}
