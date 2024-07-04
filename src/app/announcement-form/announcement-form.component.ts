import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
 
@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.css',
  providers: [AnnouncementService]
})
export class AnnouncementFormComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any; //announcement ID
  private announcement: any
 
  //initialize the call using the announcementService
  constructor(private _myService: AnnouncementService, private router:Router, public route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; /*request had a parameter _id */
            this.id = paramMap.get('_id');
 
            //request announcement info based on the id
            this._myService.getAnnouncement(this.id).subscribe({
                next: (data => {
                    //read data and assign to private variable
                    this.announcement = data;
                    //populate the information
                    this.announcementForm.patchValue({
                      announcementTitle: this.announcement.announcementTitle,
                      announcementTopic: this.announcement.announcementTopic,
                      announcementDate: this.announcement.announcementDate
                   
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
 
    announcementForm = new FormGroup({
    announcementTitle: new FormControl(''),
    announcementTopic: new FormControl(''),
    announcementDate: new FormControl('')
  });
 
  onSubmit(){
    let announcementTitle = this.announcementForm.get('announcementTitle')?.value ?? "";
    let announcementTopic = this.announcementForm.get('announcementTopic')?.value ?? "";
    let announcementDate = this.announcementForm.get('announcementDate')?.value ?? "";
    console.log("You submitted: " + announcementTitle + " " + announcementTopic + " " + announcementDate);
   
    if (this.mode == 'Add')
      this._myService.addAnnouncements(announcementTitle, announcementTopic, announcementDate);
    if (this.mode == 'Edit')
      this._myService.updateAnnouncement(this.id, announcementTitle, announcementTopic, announcementDate);
 
    this.router.navigate(['/listAnnouncements']);
  }
}