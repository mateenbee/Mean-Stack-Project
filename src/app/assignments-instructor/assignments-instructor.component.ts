import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-assignments-instructor',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './assignments-instructor.component.html',
  styleUrls: ['./assignments-instructor.component.css'],
  providers: [AssignmentService],
})
export class AssignmentsInstructorComponent implements OnInit {
  public assignments: any;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(
      (data) => {
        this.assignments = data;
      },
      (err) => console.error(err),
      () => console.log('finished loading')
    );
  }
  onDelete(assignmentId: string) {
    this.assignmentService.deleteAssignment(assignmentId).subscribe({
      next: (response) => {
        this.assignments = this.assignments.filter(
          (assignment: any) => this.assignments._id !== assignmentId
        );

        console.log('Assignment deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting assignment:', error);
      },
    });
  }
}
