import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolBorderComponent } from './cool-border.component';

describe('CoolBorderComponent', () => {
  let component: CoolBorderComponent;
  let fixture: ComponentFixture<CoolBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolBorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
