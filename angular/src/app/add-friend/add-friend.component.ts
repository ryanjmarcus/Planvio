import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {NotificationService} from "../_services/notification.service";
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {FriendService} from "../_services/friend.service";
import {Friend} from "../_models/friend";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  username;
  users: User[] = [];
  friends: Friend[] = [];
  usersToAdd: User[] = [];
  buttons: Boolean[] = [];


  constructor(private userService: UserService, private notifService: NotificationService, private authService: AuthService, private friendService: FriendService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadAllFriends(this.username);
    this.loadAllUsersBesidesUser(this.username);

  }

  loadAllFriends(username: string) {
    this.friendService.getAll().subscribe(
      friends => {
        this.friends = friends.filter(function (friend) {
          return friend.addedBy === username;
        });
        console.log(this.friends);

      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  private loadAllUsersBesidesUser(username: string) {
    this.userService.getAll().subscribe(
      users => {
        this.users = users.filter(function (user) {
          return user.username !== username;
        });
        this.users.forEach(user => {
          let match = false;
          this.friends.forEach(friend => {
            console.log(user.username + friend.username)
            if (user.username === friend.username) {
              match = true;
            }
          });
          if (!match) {
            this.usersToAdd.push(user);
          }
        });
        this.buttons = Array(this.usersToAdd.length).fill(false);
        console.log(this.buttons);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }


  actionMethod($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
    // Do actions.
  }

  addFriend(addUsername: string, addFirstName: string, addLastName: string) {
    this.friendService.add(addUsername, addFirstName, addLastName, this.username).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif(resp, 'response');
      }, error => {
        this.notifService.showNotif(error);
      });
  }
}
