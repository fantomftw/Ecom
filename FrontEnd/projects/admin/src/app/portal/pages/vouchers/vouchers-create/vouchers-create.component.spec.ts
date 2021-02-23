import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersCreateComponent } from './vouchers-create.component';

describe('VouchersCreateComponent', () => {
  let component: VouchersCreateComponent;
  let fixture: ComponentFixture<VouchersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
