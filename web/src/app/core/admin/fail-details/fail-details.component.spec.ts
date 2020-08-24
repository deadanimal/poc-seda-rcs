import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailDetailsComponent } from './fail-details.component';

describe('FailDetailsComponent', () => {
  let component: FailDetailsComponent;
  let fixture: ComponentFixture<FailDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
