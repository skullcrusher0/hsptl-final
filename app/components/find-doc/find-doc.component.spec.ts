import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDocComponent } from './find-doc.component';

describe('FindDocComponent', () => {
  let component: FindDocComponent;
  let fixture: ComponentFixture<FindDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
