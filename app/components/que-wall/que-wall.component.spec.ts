import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueWallComponent } from './que-wall.component';

describe('QueWallComponent', () => {
  let component: QueWallComponent;
  let fixture: ComponentFixture<QueWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
