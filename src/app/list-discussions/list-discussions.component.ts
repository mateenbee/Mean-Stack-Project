import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DiscussionService } from '../discussion.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-discussions',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './list-discussions.component.html',
  styleUrl: './list-discussions.component.css',
  providers: [DiscussionService]
})
export class ListDiscussionsComponent implements OnInit {
  //declare variable to hold response and make it public to be accessible from components.html
  public discussions: any;
  //initialize the call using service 
  constructor(private _myService: DiscussionService) { }
  ngOnInit() {
      this.getDiscussions();
  }
  //method called OnInit
  getDiscussions() {
  this._myService.getDiscussions().subscribe({
    //read data and assign to public variable 
    next: (data => { this.discussions = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }
  
  onDelete(discussionId: string) {
  this._myService.deleteDiscussion(discussionId);
}
}
