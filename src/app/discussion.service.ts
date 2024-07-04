import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DiscussionService {

    constructor(private http:HttpClient) {}

    //Uses http.post() to post data 
    addDiscussions(discussionNumber: string, discussionTitle: string, instructor: string, topic: string ) {
    this.http.post('http://localhost:8000/discussions', { discussionNumber, discussionTitle, instructor, topic })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
    
    }

    // Uses http.get() to load data 
    getDiscussions() {
        return this.http.get('http://localhost:8000/discussions');
    }

    deleteDiscussion(discussionId: string) {
        this.http.delete("http://localhost:8000/discussions/" + discussionId)
            .subscribe(() => {
                console.log('Deleted: ' + discussionId);
            });
            location.reload();
    }
     
    updateDiscussion(discussionId: string,discussionNumber: string, discussionTitle: string, instructor: string, topic: string,) {
        //request path http://localhost:8000/.......
    
        this.http.put("http://localhost:8000/discussions/" + 
        discussionId,{ discussionNumber, discussionTitle, instructor, topic })
        .subscribe(() => {
            console.log('Updated: ' + discussionId);
        });
    }

    //Uses http.get() to request data based  
    getDiscussion(discussionId: string) {
    return this.http.get('http://localhost:8000/discussions/'+ discussionId);
}
}