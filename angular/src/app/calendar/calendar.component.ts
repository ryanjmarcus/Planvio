import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentMonday = this.getMonday(new Date(), 0);
  currentTuesday = this.getMonday(new Date(), 1);
  currentWednesday = this.getMonday(new Date(), 2);
  currentThursday = this.getMonday(new Date(), 3);
  currentFriday = this.getMonday(new Date(), 4);
  constructor() { }

  ngOnInit() {
  }

  getMonday(d, x) {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff + x));
  }


}
