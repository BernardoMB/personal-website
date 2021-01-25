import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesPolicyDialogComponent } from './cookies-policy-dialog.component';

describe('CookiesPolicyDialogComponent', () => {
  let component: CookiesPolicyDialogComponent;
  let fixture: ComponentFixture<CookiesPolicyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesPolicyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesPolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
