import { Routes } from '@angular/router';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DiscussionFormComponent } from './discussion-form/discussion-form.component';
import { ListDiscussionsComponent } from './list-discussions/list-discussions.component';
import { ListAnnouncementsComponent } from './list-announcements/list-announcements.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';
import { NewAssignmentFormComponent } from './new-assignment-form/new-assignment-form.component';
import { AssignmentsInstructorComponent } from './assignments-instructor/assignments-instructor.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';

export const routes: Routes = [
  {
    path: '', //default component to display
    component: ListCoursesComponent,
  },
  {
    path: 'addCourse', //when courses added
    component: CourseFormComponent,
  },
  {
    path: 'editCourse/:_id', //when courses edited
    component: CourseFormComponent,
  },
  {
    path: 'listCourses', //when courses listed
    component: ListCoursesComponent,
  },
  {
    path: 'addDiscussion',
    component: DiscussionFormComponent,
  },
  {
    path: 'editDiscussion/:_id',
    component: DiscussionFormComponent,
  },
  {
    path: 'listDiscussions',
    component: ListDiscussionsComponent,
  },
  {
    path: 'addAnnouncement',  
    component: AnnouncementFormComponent
}, {
    path: 'editAnnouncement/:_id',
    component: AnnouncementFormComponent
    },{
    path: 'listAnnouncements',  
    component: ListAnnouncementsComponent
},
  {
    path: 'addAssignments',
    component: NewAssignmentFormComponent,
  },
  {
    path: 'listAssignments',
    component: AssignmentsInstructorComponent,
  },
  {
    path: 'editAssignment/:_id',
    component: NewAssignmentFormComponent,
  },
  {
    path: 'uploadVideo',
    component: UploadVideoComponent,
  },
  {
    path: '**', //when path cannot be found, keep this at the bottom
    component: NotFoundComponent,
  },
];
