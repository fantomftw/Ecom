import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantItemComponent } from './add-restaurant-item.component';

describe('AddRestaurantItemComponent', () => {
  let component: AddRestaurantItemComponent;
  let fixture: ComponentFixture<AddRestaurantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestaurantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
