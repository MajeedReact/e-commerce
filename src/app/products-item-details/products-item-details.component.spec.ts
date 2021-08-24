import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsItemDetailsComponent } from './products-item-details.component';

describe('ProductsItemDetailsComponent', () => {
  let component: ProductsItemDetailsComponent;
  let fixture: ComponentFixture<ProductsItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
