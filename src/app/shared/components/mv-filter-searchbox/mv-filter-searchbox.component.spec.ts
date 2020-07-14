import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvFilterSearchboxComponent } from './mv-filter-searchbox.component';

describe('MvFilterSearchboxComponent', () => {
  let component: MvFilterSearchboxComponent;
  let fixture: ComponentFixture<MvFilterSearchboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvFilterSearchboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvFilterSearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
