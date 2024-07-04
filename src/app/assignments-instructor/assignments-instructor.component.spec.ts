import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsInstructorComponent } from './assignments-instructor.component';

describe('AssignmentsInstructorComponent', () => {
  let component: AssignmentsInstructorComponent;
  let fixture: ComponentFixture<AssignmentsInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsInstructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentsInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
