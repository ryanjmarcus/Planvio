
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {PARecord} from '../_models/PARecord';




@Injectable({ providedIn: 'root' })
export class PArecordService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll() {
      return this.http.get<PARecord[]>(`http://localhost:3030/parecord/getparecords`);
  }



  add(addCalories: Number, addMinutes: Number, addActivity: Number, addDate: Date) {
    const addParecord = {
      calories: addCalories,
      minutes: addMinutes,
      steps:  Math.floor(Math.random() * 25000),
      activityType: addActivity,
      createdBy: this.authService.currentUserValue.username,
      createdDate: addDate
    };

    return this.http.post(`http://localhost:3030/parecord/addparecord`, addParecord);

  }


  delete(date: string) {
    return this.http.delete(`http://localhost:3030/parecord/${date}`);

  }



}
