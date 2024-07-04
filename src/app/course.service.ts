import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CourseService {

    constructor(private http:HttpClient) {}

    //Uses http.post() to post data 
    addCourses(courseNumber: string, courseTitle: string, instructor: string, semester: string, campus: string ) {
    this.http.post('http://localhost:8000/courses', { courseNumber, courseTitle, instructor, semester, campus })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
    
    }

    // Uses http.get() to load data 
    getCourses() {
        return this.http.get('http://localhost:8000/courses');
    }

    deleteCourse(courseId: string) {
        this.http.delete("http://localhost:8000/courses/" + courseId)
            .subscribe(() => {
                console.log('Deleted: ' + courseId);
            });
            location.reload();
    }
     
    updateCourse(courseId: string,courseNumber: string, courseTitle: string, instructor: string, semester: string, campus: string,) {
        //request path http://localhost:8000/courses/5xbd456xx 
        //courseNumber, courseTitle, instructor, semester, campus will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/courses/" + 
        courseId,{ courseNumber, courseTitle, instructor, semester, campus })
        .subscribe(() => {
            console.log('Updated: ' + courseId);
        });
    }

    //Uses http.get() to request data based on student id 
    getCourse(courseId: string) {
    return this.http.get('http://localhost:8000/courses/'+ courseId);
}
}