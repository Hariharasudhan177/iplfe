import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionListHeaderComponent } from './auction-list-header.component';

describe('AuctionListHeaderComponent', () => {
  let component: AuctionListHeaderComponent;
  let fixture: ComponentFixture<AuctionListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionListHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
