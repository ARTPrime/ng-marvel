import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvGalleryComponent } from './mv-gallery.component';

describe('MvGalleryComponent', () => {
  let component: MvGalleryComponent;
  let fixture: ComponentFixture<MvGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
