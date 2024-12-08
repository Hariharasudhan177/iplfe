import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamHeaderComponent } from './my-team-header.component';

describe('MyTeamHeaderComponent', () => {
  let component: MyTeamHeaderComponent;
  let fixture: ComponentFixture<MyTeamHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTeamHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
