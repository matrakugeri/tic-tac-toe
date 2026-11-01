import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentSummary } from './tournament-summary';

describe('TournamentSummary', () => {
  let component: TournamentSummary;
  let fixture: ComponentFixture<TournamentSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
