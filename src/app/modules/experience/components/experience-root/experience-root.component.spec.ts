import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceRootComponent } from './experience-root.component';

describe('ExperienceRootComponent', () => {
  let component: ExperienceRootComponent;
  let fixture: ComponentFixture<ExperienceRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
