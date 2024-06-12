import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingSessionsComponent } from './coming-sessions.component';

describe('ComingSessionsComponent', () => {
  let component: ComingSessionsComponent;
  let fixture: ComponentFixture<ComingSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComingSessionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
