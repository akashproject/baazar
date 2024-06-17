import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomorrowUpcomingSessionComponent } from './tomorrow-upcoming-session.component';

describe('TomorrowUpcomingSessionComponent', () => {
  let component: TomorrowUpcomingSessionComponent;
  let fixture: ComponentFixture<TomorrowUpcomingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TomorrowUpcomingSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TomorrowUpcomingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
