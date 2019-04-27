import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonPhotoGalleryComponent } from './person-photo-gallery.component';

describe('PhotoGalleryComponent', () => {
  let component: PersonPhotoGalleryComponent;
  let fixture: ComponentFixture<PersonPhotoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonPhotoGalleryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
