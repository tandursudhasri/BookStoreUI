import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresspageComponent } from './addresspage.component';

describe('AddresspageComponent', () => {
  let component: AddresspageComponent;
  let fixture: ComponentFixture<AddresspageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddresspageComponent]
    });
    fixture = TestBed.createComponent(AddresspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
