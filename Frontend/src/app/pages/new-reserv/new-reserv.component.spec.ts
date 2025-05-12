import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservComponent } from './new-reserv.component';

describe('NewReservComponent', () => {
  let component: NewReservComponent;
  let fixture: ComponentFixture<NewReservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewReservComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
