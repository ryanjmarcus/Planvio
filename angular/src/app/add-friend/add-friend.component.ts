import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  users = [{name: 'Jake Thomas', pid: 'jthomas'},
    {name: 'Frank Hills', pid: 'fhills'},
    {name: 'Lauren Jackson', pid: 'ljackson'},
    {name: 'Ryan Marcus', pid: 'ryanmarcus'},
    {name: 'Danny Torney', pid: 'dannytorney'},
    {name: 'Drew Perry', pid: 'drewperry'}];

  constructor() { }

  ngOnInit() {
  }

  addFriend() {

  }
}
