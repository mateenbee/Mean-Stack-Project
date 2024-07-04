import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AnnouncementService } from '../announcement.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-announcements',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './list-announcements.component.html',
  styleUrl: './list-announcements.component.css',
  providers: [AnnouncementService]
})
export class ListAnnouncementsComponent implements OnInit {
  //declare variable to hold response and make it public to be accessible from components.html
  public announcements: any;
  //initialize the call using service 
  constructor(private _myService: AnnouncementService) { }
  ngOnInit() {
      this.getAnnouncements();
  }
  //method called OnInit
  getAnnouncements() {
  this._myService.getAnnouncements().subscribe({
    //read data and assign to public variable 
    next: (data => { this.announcements = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }
  
  onDelete(announcementId: string) {
  this._myService.deleteAnnouncement(announcementId);
}
}