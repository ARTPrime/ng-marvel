import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvLoaderComponent } from './mv-loader.component';

describe('MvLoaderComponent', () => {
  let component: MvLoaderComponent;
  let fixture: ComponentFixture<MvLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
