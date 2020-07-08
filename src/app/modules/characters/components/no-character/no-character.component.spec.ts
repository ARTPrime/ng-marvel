import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCharacterComponent } from './no-character.component';

describe('NoCharacterComponent', () => {
  let component: NoCharacterComponent;
  let fixture: ComponentFixture<NoCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
