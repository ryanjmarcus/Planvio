import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SettingsComponent } from './settings/settings.component';
import { IgxAvatarModule } from 'igniteui-angular';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CourseComponent } from './course/course.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FriendsComponent } from './friends/friends.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddFriendComponent} from './add-friend/add-friend.component';
import { AddAssignmentComponent} from './add-assignment/add-assignment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

    AdminComponent,
    RegisterComponent,
    SettingsComponent,
    CoursesComponent,
    AddCourseComponent,
    CourseComponent,
    FriendsComponent,
    CalendarComponent,
    AddFriendComponent,
    AddAssignmentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IgxAvatarModule,
    FlexLayoutModule,
    NgxMaterialTimepickerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
