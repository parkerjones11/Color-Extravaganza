import { Component} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-generation',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule],
  templateUrl: './color-generation.component.html',
  styleUrl: './color-generation.component.css'
})


export class ColorGenerationComponent {
  
  colorForm: FormGroup = new FormGroup({
    rows: new FormControl(1, {validators: [Validators.required, Validators.min(1), Validators.max(1000)]}),
    cols: new FormControl(1, {validators: [Validators.required, Validators.min(1), Validators.max(702)]}),
    color: new FormControl(1, {validators: [Validators.required, Validators.min(1), Validators.max(10)]})
  });

  submitted = false;
  selectedRowIndex: number | null = null;
  colorRows: { color: string }[] = [];
  readonly colorOptions: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];

  get rows(): number {
    return this.colorForm.get('rows')?.value || 1;
  }

  get cols(): number {
    return this.colorForm.get('cols')?.value || 1;
  }

  submitForm(event: Event): void {
    if (this.colorForm.valid) {
      this.submitted = true;
      const count = this.colorForm.value.color!;
      this.colorRows = Array.from({ length: count }, (_, i) => ({
        color: this.colorOptions[i]
      }));
      this.selectedRowIndex = 0;
  }
}

getAvailableColors(currentColor: string): string[] {
  const selectedColors = this.colorRows.map(row => row.color);
  return this.colorOptions.filter(color => color === currentColor || !selectedColors.includes(color));
}

onColorChange(index: number, event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedColor = selectElement.value;
  this.colorRows[index].color = selectedColor;
}

selectRow(index: number) {
  this.selectedRowIndex = index;
}

getColumnLabels(cols: number): string[] {
  const labels: string[] = [];
  let letter1 = 'A'.charCodeAt(0);
  let letter2 = 'A'.charCodeAt(0);

  for (let i = 0; i < cols; i++) {
    let label = '';
    
    if (i < 26) {
      label = String.fromCharCode(letter1 + i);
    } else {
      let temp = i;
      while (temp >= 26) {
        label = String.fromCharCode(letter2 + (temp % 26)) + label;
        temp = Math.floor(temp / 26) - 1;
      }
      label = String.fromCharCode(letter2 + temp) + label;
    }
    
    labels.push(label);
  }
  return labels;
}

getRowRange(rows: number): number[] {
  return Array.from({ length: rows }, (_, i) => i + 1);
}

onCellClick(row: number, col: string): void {
  alert(`${col}${row}`);
}
printPage(): void {
  window.print();
}
}
