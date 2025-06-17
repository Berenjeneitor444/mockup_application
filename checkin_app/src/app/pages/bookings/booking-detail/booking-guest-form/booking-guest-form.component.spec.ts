import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingGuestFormComponent } from './booking-guest-form.component';

describe('BookingGuestFormComponent', () => {
  let component: BookingGuestFormComponent;
  let fixture: ComponentFixture<BookingGuestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingGuestFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingGuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
