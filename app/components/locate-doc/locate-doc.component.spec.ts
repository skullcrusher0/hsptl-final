import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateDocComponent } from './locate-doc.component';

describe('LocateDocComponent', () => {
  let component: LocateDocComponent;
  let fixture: ComponentFixture<LocateDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
