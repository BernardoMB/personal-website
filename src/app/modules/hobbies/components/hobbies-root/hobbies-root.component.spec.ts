import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesRootComponent } from './hobbies-root.component';

describe('HobbiesRootComponent', () => {
  let component: HobbiesRootComponent;
  let fixture: ComponentFixture<HobbiesRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HobbiesRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
