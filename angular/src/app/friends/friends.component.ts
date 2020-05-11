import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {NotificationService} from "../_services/notification.service";
import {User} from '../_models/user';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users: User[] = [];

  assignments = [{class: 'CS3754', due: 'May 20th, 2020', name: 'Cloud Project'},
    {class: 'CS3714', due: 'May 20th, 2020', name: 'Final App'}];

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  friends = [{name: 'Jake Thomas', pid: 'jthomas'},
    {name: 'Frank Hills', pid: 'fhills'},
    {name: 'Lauren Jackson', pid: 'ljackson'},
    {name: 'Ryan Marcus', pid: 'ryanmarcus'},
    {name: 'Danny Torney', pid: 'dannytorney'},
    {name: 'Drew Perry', pid: 'drewperry'}];


  constructor(private userService: UserService, private notifService: NotificationService) {
  }

  ngOnInit() {
  }



}
