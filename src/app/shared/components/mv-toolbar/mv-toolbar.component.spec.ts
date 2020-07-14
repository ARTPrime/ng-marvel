import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvToolbarComponent } from './mv-toolbar.component';

describe('MvToolbarComponent', () => {
  let component: MvToolbarComponent;
  let fixture: ComponentFixture<MvToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
