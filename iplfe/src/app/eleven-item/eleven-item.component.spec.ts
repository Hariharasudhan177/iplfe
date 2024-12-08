import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevenItemComponent } from './eleven-item.component';

describe('ElevenItemComponent', () => {
  let component: ElevenItemComponent;
  let fixture: ComponentFixture<ElevenItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevenItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
