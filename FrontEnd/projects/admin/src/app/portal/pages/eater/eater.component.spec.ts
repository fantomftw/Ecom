import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaterComponent } from './eater.component';

describe('EaterComponent', () => {
  let component: EaterComponent;
  let fixture: ComponentFixture<EaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
