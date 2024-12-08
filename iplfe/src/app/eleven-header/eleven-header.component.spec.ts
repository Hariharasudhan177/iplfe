import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevenHeaderComponent } from './eleven-header.component';

describe('ElevenHeaderComponent', () => {
  let component: ElevenHeaderComponent;
  let fixture: ComponentFixture<ElevenHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevenHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
