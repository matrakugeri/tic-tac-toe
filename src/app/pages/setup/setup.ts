import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerSymbol, TournamentLength } from '../../core/models/game-model';
import { uniqueNamesValidator } from '../../utils/game-validators';
import { GameStateService } from '../../core/services/game-state';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './setup.scss',
  templateUrl: './setup.html',
})
export class Setup {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly gameStateService = inject(GameStateService);

  readonly submitted = signal(false);

  readonly gameOptions = [1, 3, 5];

  readonly setupForm = this.fb.nonNullable.group(
    {
      player1Name: ['', [Validators.required, Validators.minLength(2)]],
      player2Name: ['', [Validators.required, Validators.minLength(2)]],
      player1Symbol: ['X' as PlayerSymbol, Validators.required],
      totalGames: [3 as TournamentLength, Validators.required],
    },
    { validators: [uniqueNamesValidator] },
  );

  get player2Symbol(): PlayerSymbol {
    return this.setupForm.controls.player1Symbol.value === 'X' ? 'O' : 'X';
  }

  setSymbol(symbol: PlayerSymbol): void {
    this.setupForm.controls.player1Symbol.setValue(symbol);
  }

  onStartTournament(): void {
    this.submitted.set(true);

    if (this.setupForm.invalid) {
      this.setupForm.markAllAsTouched();
      return;
    }

    const { player1Name, player2Name, player1Symbol, totalGames } =
      this.setupForm.getRawValue();

    const p1Symbol = player1Symbol as PlayerSymbol;
    const p2Symbol: PlayerSymbol = p1Symbol === 'X' ? 'O' : 'X';

    this.gameStateService.startTournament(
      { name: player1Name.trim(), symbol: p1Symbol },
      { name: player2Name.trim(), symbol: p2Symbol },
      totalGames as TournamentLength
    );

    this.router.navigate(['/game']);
  }
}