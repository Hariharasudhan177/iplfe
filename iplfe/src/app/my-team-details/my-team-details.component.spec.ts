import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamDetailsComponent } from './my-team-details.component';

describe('MyTeamDetailsComponent', () => {
  let component: MyTeamDetailsComponent;
  let fixture: ComponentFixture<MyTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTeamDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
