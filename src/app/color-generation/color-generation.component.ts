/**
 * ColorGenerationComponent: Generates a table/grid based on user-defined rows, columns, and selectable colors.
 */
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

  ngOnInit() {
    this.colorService.getColors().subscribe((data) => {
      this.colors = data.map(color => ({
        name: color.name,
        hex: `#${color.hex_value}`
      }));
      console.log('Colors:', this.colors);
    });
  }

  colorForm: FormGroup = new FormGroup({
    rows: new FormControl(1, { validators: [Validators.required, Validators.min(1), Validators.max(1000)] }),
    cols: new FormControl(1, { validators: [Validators.required, Validators.min(1), Validators.max(702)] }),
    color: new FormControl(1, { validators: [Validators.required, Validators.min(1), Validators.max(10)] })
  });

  submitted = false;
  submittedRows = 1;
  submittedCols = 1;
  selectedRowIndex: number | null = null;

  colorRows: { color: { name: string, hex: string } }[] = [];
  paintedCells: Record<string, string> = {}; // Tracks painted cells with keys like "A1", "B2"
  colorCoordinates: Record<string, string[]> = {}; // Stores coordinates for each color

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
      this.paintedCells = {}; // Reset painted cells when form is submitted
      this.colorCoordinates = {}; // Reset color coordinates on form submit
    }
  }

  getAvailableColors(currentColorName: string): { name: string, hex: string }[] {
    const selectedNames = this.colorRows.map(row => row.color.name);
    return this.colors.filter(c => c.name === currentColorName || !selectedNames.includes(c.name));
  }

  onColorChange(index: number, event: Event): void {
    const selectedName = (event.target as HTMLSelectElement).value;
    const selectedColor = this.colors.find(c => c.name === selectedName);
    const currentColor = this.colorRows[index].color.name;
    for (const key in this.paintedCells){
      if (this.paintedCells[key] === currentColor){
        this.paintedCells[key] = selectedName;
      }
    }
    this.colorRows[index].color = selectedColor!;
    this.updateCoordinatesForColor(selectedName, '');  // Add new coordinates for selectedName
    this.updateCoordinatesForColor(currentColor, selectedName);
    
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

  getCellKey(row: number, col: string): string {
    return `${col}${row}`;
  }

  getCellColor(row: number, col: string): string {
    const key = this.getCellKey(row, col);
    const colorName = this.paintedCells[key];
    const colorObj = this.colors.find(c => c.name === colorName);
    return colorObj?.hex || 'white';
  }

  public getCellLabel(row: number, col: string): string {
    const key = this.getCellKey(row, col);
    const colorName = this.paintedCells[key];
    if(colorName) {
      return `${colorName} (${row}, ${col})`;
    }
    return '';
  }
  

  onCellClick(row: number, col: string): void {
    if (this.selectedRowIndex === null) return; // Guard clause
    const cellKey = `${col}${row}`;
    const activeColorName = this.colorRows[this.selectedRowIndex]?.color.name;

    for (const color in this.colorCoordinates) {
      const coordList = this.colorCoordinates[color];
      const index = coordList.indexOf(cellKey);
      if (index !== -1) {
        coordList.splice(index, 1); // Remove the coordinate
        break; // Exit early: a cell only exists under one color
      }
    }
  
    // Track the color used for this cell
    this.paintedCells[cellKey] = activeColorName;
  
    // Initialize the color group if needed
    if (!this.colorCoordinates[activeColorName]) {
      this.colorCoordinates[activeColorName] = [];
    }
  
    // Avoid duplicates
    if (!this.colorCoordinates[activeColorName].includes(cellKey)) {
      this.colorCoordinates[activeColorName].push(cellKey);
      this.colorCoordinates[activeColorName].sort(); // optional: keep coordinates sorted
    }
  }

  updateCoordinatesForColor(oldColor: string, newColor: string): void {
    if (newColor) {
      // Add the new coordinate for newColor
      for (const key in this.paintedCells) {
        if (this.paintedCells[key] === newColor) {
          if (!this.colorCoordinates[newColor]) {
            this.colorCoordinates[newColor] = [];
          }
          this.colorCoordinates[newColor].push(key);
          this.colorCoordinates[newColor] = this.colorCoordinates[newColor].sort(); // Lexicographical sort
        }
      }
    }
  
    if (oldColor) {
      // Remove the old coordinates for oldColor
      const colorKeys = this.colorCoordinates[oldColor] || [];
      for (const key of colorKeys) {
        const index = this.colorCoordinates[oldColor].indexOf(key);
        if (index !== -1) {
          this.colorCoordinates[oldColor].splice(index, 1);
        }
      }
    }
  }

  getCoordinatesForColor(colorName: string): string {
    return this.colorCoordinates[colorName]?.join(', ') || '';
  }

  printPage(): void {
    window.print();
  }
}
