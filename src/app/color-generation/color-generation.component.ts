import { Component} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

var rows: number = 0;
var cols: number = 0;
var color: number = 0;

@Component({
  selector: 'app-color-generation',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './color-generation.component.html',
  styleUrl: './color-generation.component.css'
})


export class ColorGenerationComponent {
  
  colorForm: FormGroup = new FormGroup({
    rows: new FormControl(1, {validators: [Validators.required, Validators.min(1), Validators.max(1000)]}),
    cols: new FormControl(1, {validators: [Validators.required, Validators.min(1), Validators.max(702)]}),
    color: new FormControl(1, {validators: [Validators.required, Validators.min(1), Validators.max(10)]})
  });

  submitForm(event: Event): void {
    event.preventDefault();
    rows = this.colorForm.value.rows;
    cols = this.colorForm.value.cols;
    color = this.colorForm.value.color;
  }
}
