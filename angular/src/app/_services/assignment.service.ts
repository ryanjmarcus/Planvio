
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {Assignment} from '../_models/assignment';


@Injectable({ providedIn: 'root' })
export class AssignmentService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll() {
    return this.http.get<Assignment[]>(`http://localhost:3030/assignment/getAll`);
  }

  delete(assign: Assignment) {
    return this.http.post(`http://localhost:3030/assignment/delete`, assign);
  }


add(addTitle: string, addDueDay: Date, addDueTime: string, addCourseTitle: string, addUsername: string, addCreateTime: Date) {
    const assignment = {
      title: addTitle,
      dueDay: addDueDay,
      dueTime: addDueTime,
      courseTitle: addCourseTitle,
      username: addUsername,
      createdAt: addCreateTime
    };

    console.log(assignment);
    return this.http.post(`http://localhost:3030/assignment/add`, assignment);

  }



}
