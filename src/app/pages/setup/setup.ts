
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerSymbol } from '../../core/game.model';
import { uniqueNamesValidator } from '../../utils/game-validators';
// import { TicTacToeStore } from '../../core/tic-tac-toe.store';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-setup',
  styleUrl: './setup.scss',
  templateUrl: './setup.html',
})
export class Setup {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  // private readonly store = inject(TicTacToeStore);

  readonly gameOptions = [1, 3, 5];

  readonly setupForm = this.fb.nonNullable.group(
    {
      player1Name: ['', [Validators.required, Validators.minLength(2)]],
      player2Name: ['', [Validators.required, Validators.minLength(2)]],
      player1Symbol: ['X' as PlayerSymbol, Validators.required],
      totalGames: [3, Validators.required],
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
    if (this.setupForm.invalid) {
      this.setupForm.markAllAsTouched();
      return;
    }

    const { player1Name, player2Name, player1Symbol, totalGames } =
      this.setupForm.getRawValue();

    // this.store.startTournament(
    //   player1Name.trim(),
    //   player1Symbol,
    //   player2Name.trim(),
    //   totalGames,
    // );

    this.router.navigate(['/game']);
  }
}
