import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeRootComponent } from './coffee-root.component';

describe('CoffeeRootComponent', () => {
  let component: CoffeeRootComponent;
  let fixture: ComponentFixture<CoffeeRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
