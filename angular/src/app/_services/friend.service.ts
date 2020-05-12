
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Friend} from '../_models/friend';


@Injectable({ providedIn: 'root' })
export class FriendService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Friend[]>(`http://localhost:3030/friend/getAll`);
  }

  add(addUsername: string, addFirstName: string, addLastName: string, addAddedBy: string) {
    const friend = {
      username: addUsername,
      firstName: addFirstName,
      lastName: addLastName,
      addedBy: addAddedBy
    };

    console.log(friend);

    return this.http.post(`http://localhost:3030/friend/add`, friend);

  }



}
