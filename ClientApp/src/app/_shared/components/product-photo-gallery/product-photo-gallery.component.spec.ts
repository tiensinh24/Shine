import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotoGalleryComponent } from './product-photo-gallery.component';

describe('ProductPhotoGalleryComponent', () => {
  let component: ProductPhotoGalleryComponent;
  let fixture: ComponentFixture<ProductPhotoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotoGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
