import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerSymbol, TournamentLength } from '../../../../core/models/game-model';
import { uniqueNamesValidator } from '../../../../utils/game-validators';

@Component({
  selector: 'app-setup-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './setup-form.html',
  styleUrl: './setup-form.scss',
})
export class SetupFormComponent {
  private readonly fb = inject(FormBuilder);

  submitted = signal(false);

  readonly setupForm = this.fb.nonNullable.group(
    {
      player1Name: ['', [Validators.required, Validators.minLength(2)]],
      player2Name: ['', [Validators.required, Validators.minLength(2)]],
      player1Symbol: ['X' as PlayerSymbol, Validators.required],
      totalGames: [3 as TournamentLength, Validators.required],
    },
    { validators: [uniqueNamesValidator] },
  );

  formSubmitted = output<{
    player1Name: string;
    player2Name: string;
    player1Symbol: PlayerSymbol;
    totalGames: TournamentLength;
  }>();

  get player2Symbol(): PlayerSymbol {
    return this.setupForm.controls.player1Symbol.value === 'X' ? 'O' : 'X';
  }

  setSymbol(symbol: PlayerSymbol): void {
    this.setupForm.controls.player1Symbol.setValue(symbol);
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.setupForm.invalid) {
      this.setupForm.markAllAsTouched();
      return;
    }

    this.formSubmitted.emit(this.setupForm.getRawValue());
  }
}
