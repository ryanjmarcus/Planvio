import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {SettingsComponent} from './settings/settings.component';
import {CoursesComponent} from "./courses/courses.component";
import {AddCourseComponent} from "./add-course/add-course.component";
import {FriendsComponent} from './friends/friends.component';
import {AddFriendComponent} from './add-friend/add-friend.component';
import {AddAssignmentComponent} from './add-assignment/add-assignment.component';
import {CalendarComponent} from "./calendar/calendar.component";

//TODO: add the route to the 'settings' component.

// tslint:disable-next-line:max-line-length
const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },

  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},

  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  { path: 'courses/add', component: AddCourseComponent, canActivate: [AuthGuard]},
  { path: 'courses/edit/:title/:days/:startTime/:endTime/:instructorName/:instructorImage/:createdAt', component: AddCourseComponent, canActivate: [AuthGuard]},

  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  { path: 'calendar/add', component: AddAssignmentComponent, canActivate: [AuthGuard]},
  { path: 'calendar/edit/:title/:dueDay/:dueTime/:courseTitle/:username/:createdAt', component: AddAssignmentComponent, canActivate: [AuthGuard]},


  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
  { path: 'friends/add', component: AddFriendComponent, canActivate: [AuthGuard]},

  //{ path: '**', redirectTo: '' }
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
