import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesApprovalScreenComponent } from './leaves-approval-screen.component';

describe('LeavesApprovalScreenComponent', () => {
  let component: LeavesApprovalScreenComponent;
  let fixture: ComponentFixture<LeavesApprovalScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesApprovalScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavesApprovalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
