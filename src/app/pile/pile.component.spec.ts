/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PileComponent } from './pile.component';

describe('PileComponent', () => {
  let component: PileComponent;
  let fixture: ComponentFixture<PileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
