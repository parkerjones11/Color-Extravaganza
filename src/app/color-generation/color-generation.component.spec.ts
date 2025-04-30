import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColorService } from '../services/color.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-color-generation',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './color-generation.component.html',
  styleUrl: './color-generation.component.css'
})
export class ColorGenerationComponent {

  constructor(private colorService: ColorService) {}

  colors: { name: string, hex: string }[] = [];
  selectedRowIndex: number | null = null;
  submitted = false;
  submittedRows = 1;
  submittedCols = 1;

  colorForm: FormGroup = new FormGroup({
    rows: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(1000)]),
    cols: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(702)]),
    color: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)])
  });

  colorRows: { color: { name: string, hex: string } }[] = [];
  clickedCells: { row: number; col: string; color: { name: string; hex: string } }[] = [];

  ngOnInit() {
    this.colorService.getColors().subscribe((data) => {
      this.colors = data.map(color => ({
        name: color.name,
        hex: `#${color.hex_value}`
      }));
    });
  }

  get rows(): number {
    return this.colorForm.get('rows')?.value || 1;
  }

  get cols(): number {
    return this.colorForm.get('cols')?.value || 1;
  }

  submitForm(event: Event): void {
    if (this.colorForm.valid) {
      this.submitted = true;
      this.submittedRows = this.rows;
      this.submittedCols = this.cols;
      const count = this.colorForm.value.color!;

      this.colorRows = Array.from({ length: count }, (_, i) => ({
        color: this.colors[i]
      }));

      this.selectedRowIndex = 0;
      this.clickedCells = []; // reset previous cell coloring
    }
  }

  onColorChange(index: number, event: Event): void {
    const selectedName = (event.target as HTMLSelectElement).value;
    const selectedColor = this.colors.find(c => c.name === selectedName);
    this.colorRows[index].color = selectedColor!;
  }

  onCellClick(row: number, col: string): void {
    if (this.selectedRowIndex !== null) {
      const selectedColor = this.colorRows[this.selectedRowIndex].color;
      const existing = this.clickedCells.find(cell => cell.row === row && cell.col === col);

      if (existing) {
        existing.color = selectedColor;
      } else {
        this.clickedCells.push({ row, col, color: selectedColor });
      }
    }
  }

  getCellColor(row: number, col: string): string | null {
    const cell = this.clickedCells.find(c => c.row === row && c.col === col);
    return cell ? cell.color.hex : null;
  }

  getAvailableColors(currentColorName: string): { name: string, hex: string }[] {
    const selectedNames = this.colorRows.map(row => row.color.name);
    return this.colors.filter(c => c.name === currentColorName || !selectedNames.includes(c.name));
  }

  formatColorName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
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

  printPage(): void {
    window.print();
  }
}
