import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  date: FormControl = new FormControl({ value: new Date(), disabled: false});
  addDate: Date = new Date();
  addCourse: 'CS3754';
  buttonName = 'Add';
  constructor() { }

  ngOnInit() {
  }

  createAssignment() {
    // Use UserService to add the assignment
  }
}
