import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageUploadsComponent } from './product-image-uploads.component';

describe('ProductImageUploadsComponent', () => {
  let component: ProductImageUploadsComponent;
  let fixture: ComponentFixture<ProductImageUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductImageUploadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
