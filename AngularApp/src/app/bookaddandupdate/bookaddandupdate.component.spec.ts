import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookaddandupdateComponent } from './bookaddandupdate.component';

describe('BookaddandupdateComponent', () => {
  let component: BookaddandupdateComponent;
  let fixture: ComponentFixture<BookaddandupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookaddandupdateComponent]
    });
    fixture = TestBed.createComponent(BookaddandupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
