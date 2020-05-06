import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {SettingsComponent} from './settings/settings.component';
import {AddComponent} from "./add/add.component";
import {RankingsComponent} from "./rankings/rankings.component";
import {CoursesComponent} from "./courses/courses.component";
import {AddCourseComponent} from "./add-course/add-course.component";
import {FriendsComponent} from './friends/friends.component';

//TODO: add the route to the 'settings' component.

// tslint:disable-next-line:max-line-length
const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'rankings', component: RankingsComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
  { path: 'add', component: AddComponent },
  { path: 'courses', component: CoursesComponent},
  { path: 'courses/add', component: AddCourseComponent},
  { path: 'friends', component: FriendsComponent},
  { path: 'courses/edit/:title/:days/:startTime/:endTime/:instructorName/:instructorImage', component: AddCourseComponent},
  { path: 'edit/:date/:calories/:minutes/:type', component: AddComponent}
  //{ path: '**', redirectTo: '' }
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
