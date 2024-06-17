import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysUpcomingSessionComponent } from './todays-upcoming-session.component';

describe('TodaysUpcomingSessionComponent', () => {
  let component: TodaysUpcomingSessionComponent;
  let fixture: ComponentFixture<TodaysUpcomingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaysUpcomingSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodaysUpcomingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
