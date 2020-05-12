import {Component} from '@angular/core';
import {first} from 'rxjs/operators';


import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {FriendService} from "../_services/friend.service";
import {Role} from "../_models/role";


@Component({ templateUrl: 'login.component.html' ,
  styleUrls: ['login.component.css']})
export class LoginComponent {
 // loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  username: string;
  password: string;

  constructor(
   // private formBuilder: FormBuilder,
     private router: Router,
     private authService: AuthService,
     private notifService: NotificationService,
     private userService: UserService,
     private friendService: FriendService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
   //   this.router.navigate(['/']);
    }
  }

  login() {
    this.submitted = true;
    this.loading = true;

    this.loading = true;
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['']);

          this.notifService.showNotif('Logged in as: ' + this.username, 'confirmation');
        },
        error => {
          this.error = error;
          this.loading = false;
          // show a snackbar to user
          this.notifService.showNotif(this.error, 'dismiss');
          console.log('Error', error);
        });
  }

  generateData() {

    this.username = 'demo';
    this.password = 'planvio';

    // Add all users

    const userOne = {
      role: Role.admin,
      firstName: 'Ryan',
      lastName: 'Marcus',
      email: 'ryan@gmail.com',
      username: 'ryanmarcus',
      password: 'planvio'
    };

    this.userService.register(userOne).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Generated Data', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    const userTwo = {
      role: Role.admin,
      firstName: 'Drew',
      lastName: 'Perry',
      email: 'drew@gmail.com',
      username: 'drewperry',
      password: 'planvio'
    };

    this.userService.register(userTwo).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Generated Data', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    const userThree = {
      role: Role.admin,
      firstName: 'Danny',
      lastName: 'Torney',
      email: 'danny@gmail.com',
      username: 'dannytorney',
      password: 'planvio'
    };

    this.userService.register(userThree).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Generated Data', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    const userFour = {
      role: Role.admin,
      firstName: 'Michael',
      lastName: 'Smith',
      email: 'michael@gmail.com',
      username: 'michaelsmith',
      password: 'planvio'
    };

    this.userService.register(userFour).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Generated Data', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    const userFive = {
      role: Role.admin,
      firstName: 'Sarah',
      lastName: 'Peyton',
      email: 'sarah@gmail.com',
      username: 'sarahpeyton',
      password: 'planvio'
    };

    this.userService.register(userFive).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Generated Data', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });

    const userSix = {
      role: Role.admin,
      firstName: 'Jessica',
      lastName: 'Wright',
      email: 'jessica@gmail.com',
      username: 'jessicawright',
      password: 'planvio'
    };

    this.userService.register(userSix).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('Generated Data', 'Success!');
      }, error => {
        this.notifService.showNotif(error);
      });


  const userSeven = {
    role: Role.admin,
    firstName: 'John',
    lastName: 'Smith',
    email: 'demo@gmail.com',
    username: 'demo',
    password: 'planvio'
  };

  this.userService.register(userSeven).pipe(first()).subscribe(
    resp => {
  this.notifService.showNotif('Generated Data', 'Success!');
}, error => {
  this.notifService.showNotif(error);
});

}
    //Add Friends

















}


