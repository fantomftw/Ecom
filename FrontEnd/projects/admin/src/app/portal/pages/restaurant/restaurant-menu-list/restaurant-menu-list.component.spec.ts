import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuListComponent } from './restaurant-menu-list.component';

describe('RestaurantMenuListComponent', () => {
  let component: RestaurantMenuListComponent;
  let fixture: ComponentFixture<RestaurantMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
