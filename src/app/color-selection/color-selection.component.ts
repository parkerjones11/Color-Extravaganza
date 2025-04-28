import { Component} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColorService } from '../services/color.service';
import { HttpContext } from '@angular/common/http';

@Component({
    selector: 'app-color-selection',
    standalone: true,
    imports: [ReactiveFormsModule, RouterOutlet, CommonModule],
    templateUrl: './color-selection.component.html',
    styleUrl: './color-selection.component.css'
  })

export class ColorSelectionComponent {

    constructor(private colorService: ColorService) {}
    colors: any[] = [];

    addColorMessage = '';
    deleteColorMessage = '';
    editColorMessage = '';

    addColorForm: FormGroup = new FormGroup({
        name: new FormControl('', {validators: [Validators.required]}),
        hex: new FormControl('', {validators: [Validators.required]})
    });

    deleteColorForm: FormGroup = new FormGroup({
        name: new FormControl('', {validators: [Validators.required]})
    });

    editColorForm: FormGroup = new FormGroup({
        name: new FormControl('', {validators: [Validators.required]}),
        hex: new FormControl('', {validators: [Validators.required]})
    })


    submitAdd(event: Event): void {
        if (this.addColorForm.valid){
            this.addColor(this.addColorForm.value.name, this.addColorForm.value.hex);
        }
    }

    submitDelete(event: Event): void {
        if (this.deleteColorForm.valid){
            this.deleteColor(this.deleteColorForm.value.name);
        }
    }

    submitEdit(event: Event): void {
        if (this.editColorForm.valid){
            this.editColor(this.editColorForm.value.name, this.editColorForm.value.hex);
        }
    }
  

    ngOnInit() {
       
      this.colorService.getColors().subscribe((data) => {
        this.colors = data;
        console.log(this.colors);
      });
      
    }

    addColor(colorName: string, colorHex: string): void {
        this.colorService.addColor(colorName, colorHex).subscribe((response) => {
            this.addColorMessage = response.message;
        });
    }

    deleteColor(colorName: string){
        this.colorService.deleteColor(colorName).subscribe((response) => {
            this.deleteColorMessage = response.message;
        })
    }

    editColor(colorName: string, colorHex: string){
        this.colorService.editColor(colorName, colorHex).subscribe((response) => {
            this.editColorMessage = response.message;
        })
    }


    getAddColorMessage() {
        return this.addColorMessage;
    }

    getDeleteColorMessage() {
        return this.deleteColorMessage;
    }

    getEditColorMessage() {
        return this.editColorMessage;
    }

}