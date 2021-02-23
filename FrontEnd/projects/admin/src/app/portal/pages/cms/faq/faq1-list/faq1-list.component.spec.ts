import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faq1ListComponent } from './faq1-list.component';

describe('Faq1ListComponent', () => {
  let component: Faq1ListComponent;
  let fixture: ComponentFixture<Faq1ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Faq1ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Faq1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
