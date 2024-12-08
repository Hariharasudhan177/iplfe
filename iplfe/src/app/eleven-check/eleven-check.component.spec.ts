import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevenCheckComponent } from './eleven-check.component';

describe('ElevenCheckComponent', () => {
  let component: ElevenCheckComponent;
  let fixture: ComponentFixture<ElevenCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevenCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevenCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
