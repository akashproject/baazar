import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBioComponent } from './trainer-bio.component';

describe('TrainerBioComponent', () => {
  let component: TrainerBioComponent;
  let fixture: ComponentFixture<TrainerBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
