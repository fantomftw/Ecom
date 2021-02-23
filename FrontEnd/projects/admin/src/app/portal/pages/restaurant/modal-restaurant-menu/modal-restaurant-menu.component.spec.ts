import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRestaurantMenuComponent } from './modal-restaurant-menu.component';

describe('ModalRestaurantMenuComponent', () => {
  let component: ModalRestaurantMenuComponent;
  let fixture: ComponentFixture<ModalRestaurantMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRestaurantMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRestaurantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
