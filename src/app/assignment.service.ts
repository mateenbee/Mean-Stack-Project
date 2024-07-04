import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private baseUrl = 'http://localhost:8000/assignments';

  constructor(private http: HttpClient) {}

  getAssignments(assignmentId?: string): Observable<any> {
    const url = assignmentId ? `${this.baseUrl}/${assignmentId}` : this.baseUrl;
    return this.http.get(url);
  }

  addAssignments(
    assignmentName: string,
    dueDate: string,
    grade: string
  ): Observable<any> {
    return this.http.post(
      this.baseUrl,
      { assignmentName, dueDate },
      httpOptions
    );
  }

  updateAssignment(
    assignmentId: string,
    assignmentName: string,
    dueDate: string,
    grade: string
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${assignmentId}`,
      { assignmentName, dueDate, grade },
      httpOptions
    );
  }

  deleteAssignment(assignmentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${assignmentId}`);
  }
}
