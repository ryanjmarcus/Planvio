import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {NotificationService} from "../_services/notification.service";
import {User} from '../_models/user';
import {FriendService} from "../_services/friend.service";
import {Friend} from "../_models/friend";
import {AuthService} from "../_services/auth.service";

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
  friends: Friend[] = [];
  users: User[] = [];
  username;
  friendUsername;
  friendFirstName;
  friendLastName;

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


  constructor(private userService: UserService, private notifService: NotificationService, private friendService: FriendService, private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadAllFriends(this.username);

  }

  loadAllFriends(username: string) {
    this.friendService.getAll().subscribe(
      friends => {
        this.friends = friends.filter(function (friend) {
          return friend.addedBy === username;
        });
        console.log(this.friends);
        this.friendUsername = this.friends[0].username;
        this.friendFirstName = this.friends[0].firstName;
        this.friendLastName = this.friends[0].lastName;

      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  setSelectedFriend(username: string, firstName: string, lastName: string) {
    this.friendUsername = username;
    this.friendFirstName = firstName;
    this.friendLastName = lastName;
  }



}
