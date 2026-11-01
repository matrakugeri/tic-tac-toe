import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class BoardComponent {
  board = input.required<(string | null)[]>();
  winningLine = input<(number[] | null)>(null);
  isDisabled = input<boolean>(false);

  cellClicked = output<number>();

  onCellClick(index: number): void {
    if (!this.isDisabled() && this.board()[index] === null) {
      this.cellClicked.emit(index);
    }
  }
}