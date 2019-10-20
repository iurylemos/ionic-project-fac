import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailsPage } from './datails.page';

describe('DatailsPage', () => {
  let component: DatailsPage;
  let fixture: ComponentFixture<DatailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
