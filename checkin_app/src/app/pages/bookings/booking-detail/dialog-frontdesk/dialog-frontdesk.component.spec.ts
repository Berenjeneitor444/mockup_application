import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFrontdeskComponent } from './dialog-frontdesk.component';

describe('DialogFrontdeskComponent', () => {
  let component: DialogFrontdeskComponent;
  let fixture: ComponentFixture<DialogFrontdeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogFrontdeskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFrontdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
