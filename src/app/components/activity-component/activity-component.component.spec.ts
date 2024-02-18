import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComponentComponent } from './activity-component.component';

describe('ActivityComponentComponent', () => {
  let component: ActivityComponentComponent;
  let fixture: ComponentFixture<ActivityComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
