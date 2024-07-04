import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class AnnouncementService {
 
    constructor(private http:HttpClient) {}
 
    //Uses http.post() to post data
    addAnnouncements(announcementTitle: string, announcementTopic: string, announcementDate: string ) {
    this.http.post('http://localhost:8000/announcements', { announcementTitle, announcementTopic, announcementDate })
        .subscribe((responseData) => {
            console.log(responseData);
        });
   
    }
 
    // Uses http.get() to load data
    getAnnouncements() {
        return this.http.get('http://localhost:8000/announcements');
    }
 
    deleteAnnouncement(announcementId: string) {
        this.http.delete("http://localhost:8000/announcements/" + announcementId)
            .subscribe(() => {
                console.log('Deleted: ' + announcementId);
            });
            location.reload();
    }
     
    updateAnnouncement(announcementId: string,announcementTitle: string, announcementTopic: string, announcementDate: string,) {
        //request path http://localhost:8000/.......
   
        this.http.put("http://localhost:8000/announcements/" +
        announcementId,{ announcementTitle, announcementTopic, announcementDate })
        .subscribe(() => {
            console.log('Updated: ' + announcementId);
        });
    }
 
    //Uses http.get() to request data based  
    getAnnouncement(announcementId: string) {
    return this.http.get('http://localhost:8000/announcements/'+ announcementId);
}
}