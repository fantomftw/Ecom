import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEnquiryComponent } from './restaurant-enquiry.component';

describe('RestaurantEnquiryComponent', () => {
  let component: RestaurantEnquiryComponent;
  let fixture: ComponentFixture<RestaurantEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
