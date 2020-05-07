import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends = [{name: 'Jake Thomas', pid: 'jthomas'},
    {name: 'Frank Hills', pid: 'fhills'},
    {name: 'Lauren Jackson', pid: 'ljackson'}];

  assignments = [{class: 'CS3754', due: 'May 20th, 2020', name: 'Cloud Project'},
    {class: 'CS3714', due: 'May 20th, 2020', name: 'Final App'}];
  constructor() {
  }

  ngOnInit() {
  }

  // Gets a users friends
  getFriends(user) {
    return user.friends;
  }
  //Shows all assignments
  showAssignments(user) {
    return user.assignments;
  }

  addFriend(user) {

  }
}
