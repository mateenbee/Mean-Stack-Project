import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../course.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css',
  providers: [CourseService]
})
export class ListCoursesComponent implements OnInit {
  //declare variable to hold response and make it public to be accessible from components.html
  public courses: any;
  //initialize the call using CourseService 
  constructor(private _myService: CourseService) { }
  ngOnInit() {
      this.getCourses();
  }
  //method called OnInit
  getCourses() {
  this._myService.getCourses().subscribe({
    //read data and assign to public variable courses
    next: (data => { this.courses = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }
  
  onDelete(courseId: string) {
  this._myService.deleteCourse(courseId);
}
}