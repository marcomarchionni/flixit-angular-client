import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameFieldComponent } from './username-field.component';

describe('UsernameFieldComponent', () => {
  let component: UsernameFieldComponent;
  let fixture: ComponentFixture<UsernameFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsernameFieldComponent]
    });
    fixture = TestBed.createComponent(UsernameFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
