import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupJoinedRequestsComponent } from './group-joined-requests.component';

describe('GroupJoinedRequestsComponent', () => {
  let component: GroupJoinedRequestsComponent;
  let fixture: ComponentFixture<GroupJoinedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupJoinedRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupJoinedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
