import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPriComponent } from './main-pri.component';

describe('MainPriComponent', () => {
  let component: MainPriComponent;
  let fixture: ComponentFixture<MainPriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
