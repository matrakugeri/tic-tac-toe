import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const uniqueNamesValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const p1 = group.get('player1Name')?.value?.trim().toLowerCase();
  const p2 = group.get('player2Name')?.value?.trim().toLowerCase();

  if (p1 && p2 && p1 === p2) {
    return { duplicateNames: true };
  }
  return null;
};