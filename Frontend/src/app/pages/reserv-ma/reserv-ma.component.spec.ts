import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservMaComponent } from './reserv-ma.component';

describe('ReservMaComponent', () => {
  let component: ReservMaComponent;
  let fixture: ComponentFixture<ReservMaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservMaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservMaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
