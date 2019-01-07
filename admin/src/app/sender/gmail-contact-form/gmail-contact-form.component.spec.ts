import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailContactFormComponent } from './gmail-contact-form.component';

describe('GmailContactFormComponent', () => {
  let component: GmailContactFormComponent;
  let fixture: ComponentFixture<GmailContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmailContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
