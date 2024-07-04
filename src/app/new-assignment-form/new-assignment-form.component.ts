import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssignmentService } from '../assignment.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-assignment-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule,MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './new-assignment-form.component.html',
  styleUrls: ['./new-assignment-form.component.css'],
  providers: [AssignmentService],
})
export class NewAssignmentFormComponent implements OnInit {
  assignmentForm: FormGroup;
  public mode = 'Add';
  private id: any;
  private assignment: any;

  constructor(
    private _myService: AssignmentService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.assignmentForm = new FormGroup({
      assignmentName: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      grade: new FormControl(),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit';
        this.id = paramMap.get('_id');
        this._myService.getAssignments(this.id).subscribe({
          next: (data) => {
            this.assignment = data;
            this.assignmentForm.patchValue({
              assignmentName: data.assignmentName,
              dueDate: data.dueDate,
              grade: data.grade,
            });
          },
          error: (err) => console.error(err),
          complete: () => console.log('Finished loading'),
        });
      } else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }

  onSubmit() {
    if (this.assignmentForm.valid) {
      if (this.mode === 'Add') {
        this._myService
          .addAssignments(
            this.assignmentForm.value.assignmentName,
            this.assignmentForm.value.dueDate,
            this.assignmentForm.value.grade
          )
          .subscribe({
            next: () => {
              console.log('Assignment added');
              this.router.navigate(['/listAssignments']);
            },
            error: (err) => console.error(err),
          });
      } else if (this.mode === 'Edit' && this.id) {
        this._myService
          .updateAssignment(
            this.id,
            this.assignmentForm.value.assignmentName,
            this.assignmentForm.value.dueDate,
            this.assignmentForm.value.grade
          )
          .subscribe({
            next: () => {
              console.log('Assignment updated');
              this.router.navigate(['/listAssignments']);
            },
            error: (err) => console.error(err),
          });
      }
    }
  }
}
