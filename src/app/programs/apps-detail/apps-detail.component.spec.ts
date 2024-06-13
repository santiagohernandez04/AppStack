import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsDetailComponent } from './apps-detail.component';

describe('AppsDetailComponent', () => {
  let component: AppsDetailComponent;
  let fixture: ComponentFixture<AppsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
