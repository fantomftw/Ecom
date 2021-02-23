import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuItemComponent } from './restaurant-menu-item.component';

describe('RestaurantMenuItemComponent', () => {
  let component: RestaurantMenuItemComponent;
  let fixture: ComponentFixture<RestaurantMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
