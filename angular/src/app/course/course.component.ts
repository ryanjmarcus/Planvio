import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../_models/course";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;

  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  instructorImage: string;
  encodedInstructorImage: string;

  constructor() { }

  ngOnInit() {
        this.course.instructorImage = decodeURIComponent(this.course.instructorImage);
        this.monday = this.course.days[0];
        this.tuesday = this.course.days[1];
        this.wednesday = this.course.days[2];
        this.thursday = this.course.days[3];
        this.friday = this.course.days[4];
        this.encodedInstructorImage = encodeURIComponent(this.course.instructorImage);
  }





}
