import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionFormComponent } from './discussion-form.component';

describe('DiscussionFormComponent', () => {
  let component: DiscussionFormComponent;
  let fixture: ComponentFixture<DiscussionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscussionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});