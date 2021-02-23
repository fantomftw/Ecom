import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantRevenueComponent } from './restaurant-revenue.component';

describe('RestaurantRevenueComponent', () => {
  let component: RestaurantRevenueComponent;
  let fixture: ComponentFixture<RestaurantRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
