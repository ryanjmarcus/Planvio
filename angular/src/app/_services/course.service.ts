
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {Course} from '../_models/course';
import {PARecord} from "../_models/PARecord";


@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll() {
    return this.http.get<Course[]>(`http://localhost:3030/course/getAll`);
  }

  add(addTitle: string, addDays: boolean[], addStartTime: string, addEndTime: string, addInstructorName: string, addInstructorImage: string, addUsername: string, addDate: Date) {
    const course = {
      title: addTitle,
      days: addDays,
      startTime: addStartTime,
      endTime: addEndTime,
      instructorName: addInstructorName,
      instructorImage: addInstructorImage,
      username: addUsername,
      createdAt: addDate
    };

    console.log(course);

    return this.http.post(`http://localhost:3030/course/add`, course);

  }



}
