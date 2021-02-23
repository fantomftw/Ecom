import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantUserComponent } from './restaurant-user.component';

describe('RestaurantUserComponent', () => {
  let component: RestaurantUserComponent;
  let fixture: ComponentFixture<RestaurantUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
