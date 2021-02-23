import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrendComponent } from './add-trend.component';

describe('AddTrendComponent', () => {
  let component: AddTrendComponent;
  let fixture: ComponentFixture<AddTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
