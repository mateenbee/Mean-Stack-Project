import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DiscussionService } from '../discussion.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-discussion-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './discussion-form.component.html',
  styleUrl: './discussion-form.component.css',
  providers: [DiscussionService]
})
export class DiscussionFormComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any; //discussion ID
  private discussion: any

  //initialize the call using the discussionService 
  constructor(private _myService: DiscussionService, private router:Router, public route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; /*request had a parameter _id */
            this.id = paramMap.get('_id');

            //request discussion info based on the id
            this._myService.getDiscussion(this.id).subscribe({
                next: (data => {
                    //read data and assign to private variable 
                    this.discussion = data;
                    //populate the information
                    this.discussionForm.patchValue({
                      discussionNumber: this.discussion.discussionNumber,
                      discussionTitle: this.discussion.discussionTitle,
                      instructor: this.discussion.instructor,
                      topic: this.discussion.topic
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

    discussionForm = new FormGroup({
    discussionNumber: new FormControl(''),
    discussionTitle: new FormControl(''),
    instructor: new FormControl(''),
    topic: new FormControl('')
  });

  onSubmit(){
    let discussionNumber = this.discussionForm.get('discussionNumber')?.value ?? "";
    let discussionTitle = this.discussionForm.get('discussionTitle')?.value ?? "";
    let instructor = this.discussionForm.get('instructor')?.value ?? "";
    let topic = this.discussionForm.get('topic')?.value ?? "";
    console.log("You submitted: " + discussionNumber + " " + discussionTitle + " " + instructor + " " + topic);
    
    if (this.mode == 'Add')
      this._myService.addDiscussions(discussionNumber, discussionTitle, instructor, topic);
    if (this.mode == 'Edit')
      this._myService.updateDiscussion(this.id, discussionNumber, discussionTitle, instructor, topic);

    this.router.navigate(['/listDiscussions']);
  }
}