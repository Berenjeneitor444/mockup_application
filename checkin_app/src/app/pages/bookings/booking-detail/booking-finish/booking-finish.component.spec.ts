import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFinishComponent } from './booking-finish.component';

describe('BookingFinishComponent', () => {
  let component: BookingFinishComponent;
  let fixture: ComponentFixture<BookingFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingFinishComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
