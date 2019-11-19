import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestgirlfriendPageComponent } from './bestgirlfriend-page.component';

describe('BestgirlfriendPageComponent', () => {
  let component: BestgirlfriendPageComponent;
  let fixture: ComponentFixture<BestgirlfriendPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestgirlfriendPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestgirlfriendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
