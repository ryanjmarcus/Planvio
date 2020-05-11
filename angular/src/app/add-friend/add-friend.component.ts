import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {NotificationService} from "../_services/notification.service";
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {FriendService} from "../_services/friend.service";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  nonFriends: User[] = [];
  username

  constructor(private userService: UserService, private notifService: NotificationService, private authService: AuthService, private friendService: FriendService) {
  }

  ngOnInit() {
    this.username = this.authService.currentUserValue.username;
    this.loadNonFriends(this.username);
  }

  private loadNonFriends(username: string) {
    this.userService.getAll().subscribe(
      users => {
        this.nonFriends = users.filter(function (user) {
          return user.username !== username;
        });
        console.log(this.nonFriends);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
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
