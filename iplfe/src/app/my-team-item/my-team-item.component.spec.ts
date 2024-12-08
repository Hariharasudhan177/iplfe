import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamItemComponent } from './my-team-item.component';

describe('MyTeamItemComponent', () => {
  let component: MyTeamItemComponent;
  let fixture: ComponentFixture<MyTeamItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTeamItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
