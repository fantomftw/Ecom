import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faq1CreateComponent } from './faq1-create.component';

describe('Faq1CreateComponent', () => {
  let component: Faq1CreateComponent;
  let fixture: ComponentFixture<Faq1CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Faq1CreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Faq1CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
