import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {CourseService} from "../_services/course.service";
import {UserService} from "../_services/user.service";
import {NotificationService} from '../_services/notification.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from "../_services/auth.service";
import {User} from "../_models/user";
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;
  user: User;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  date: Date;
  days: [string, string, string, string, string];
  buttonName: string;

  constructor(private courseService: CourseService, private notifService: NotificationService, private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.buttonName = 'Add';
    this.date = new Date();
    this.user = this.authService.currentUserValue;

    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;

    this.courseForm = this.formBuilder.group({
      title: [''],
      instructorName: [''],
      instructorImage: [''],
      startTime: [''],
      endTime: [''],

    });


    this.route.params.subscribe(params => {
      if (params.title) {

        this.courseForm.setValue({
          title: params.title,
          instructorName: params.instructorName,
          instructorImage: params.instructorImage,
          startTime: params.startTime,
          endTime: params.endTime
        })

        this.days = params.days.split(',');

        this.monday = this.days[0] === 'true';
        this.tuesday = this.days[1] === 'true';
        this.wednesday = this.days[2] === 'true';
        this.thursday = this.days[3] === 'true';
        this.friday = this.days[4] === 'true';

        this.buttonName = 'Save';

      }
    });

  }

  mondayClick() {
    this.monday = !this.monday;
  }

  tuesdayClick() {
    this.tuesday = !this.tuesday;
  }

  wednesdayClick() {
    this.wednesday = !this.wednesday;
  }

  thursdayClick() {
    this.thursday = !this.thursday;
  }

  fridayClick() {
    this.friday = !this.friday;
  }


  createCourse() {
    console.log(this.courseForm.value);
    this.courseService.add(this.courseForm.value.title, [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday], this.courseForm.value.startTime, this.courseForm.value.endTime, this.courseForm.value.instructorName, this.courseForm.value.instructorImage, this.user.username, this.date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif(resp, 'response');
      }, error => {
        this.notifService.showNotif(error);
      });
  }


}
