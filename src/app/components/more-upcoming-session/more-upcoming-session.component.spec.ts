import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreUpcomingSessionComponent } from './more-upcoming-session.component';

describe('MoreUpcomingSessionComponent', () => {
  let component: MoreUpcomingSessionComponent;
  let fixture: ComponentFixture<MoreUpcomingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoreUpcomingSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoreUpcomingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
