import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
  providers: [CourseService]
})
export class CourseFormComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any; //course ID
  private course: any

  //initialize the call using CourseService 
  constructor(private _myService: CourseService, private router:Router, public route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; /*request had a parameter _id */
            this.id = paramMap.get('_id');

            //request course info based on the id
            this._myService.getCourse(this.id).subscribe({
                next: (data => {
                    //read data and assign to private variable course
                    this.course = data;
                    //populate the courseNumber, courseTitle, instructor, semester, campus on the page
                    this.courseForm.patchValue({
                      courseNumber: this.course.courseNumber,
                      courseTitle: this.course.courseTitle,
                      instructor: this.course.instructor,
                      semester: this.course.semester,
                      campus: this.course.campus
                    })
                }),

                error: (err => console.error(err)),
                complete: (() => console.log('finished loading'))
            });
        }
        else {
            this.mode = 'Add';
            this.id = null;
        }
    });
}

  courseForm = new FormGroup({
    courseNumber: new FormControl(''),
    courseTitle: new FormControl(''),
    instructor: new FormControl(''),
    semester: new FormControl(''),
    campus: new FormControl('')
  });

  onSubmit(){
    let courseNumber = this.courseForm.get('courseNumber')?.value ?? "";
    let courseTitle = this.courseForm.get('courseTitle')?.value ?? "";
    let instructor = this.courseForm.get('instructor')?.value ?? "";
    let semester = this.courseForm.get('semester')?.value ?? "";
    let campus = this.courseForm.get('campus')?.value ?? "";
    console.log("You submitted: " + courseNumber + " " + courseTitle + " " + instructor + " " + semester + " " + campus);
    
    if (this.mode == 'Add')
      this._myService.addCourses(courseNumber, courseTitle, instructor, semester, campus);
    if (this.mode == 'Edit')
      this._myService.updateCourse(this.id, courseNumber, courseTitle, instructor, semester, campus);

    this.router.navigate(['/listCourses']);
  }
}
