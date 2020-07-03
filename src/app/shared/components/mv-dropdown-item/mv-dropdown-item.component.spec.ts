import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvDropdownItemComponent } from './mv-dropdown-item.component';

describe('MvDropdownItemComponent', () => {
  let component: MvDropdownItemComponent;
  let fixture: ComponentFixture<MvDropdownItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvDropdownItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
