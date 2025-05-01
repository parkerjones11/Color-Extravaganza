import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-selection',
  standalone: true,
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.css'],
  imports: [ReactiveFormsModule]
})
export class ColorSelectionComponent {
  addColorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hex: new FormControl('', [Validators.required])
  });

  editColorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hex: new FormControl('', [Validators.required])
  });

  deleteColorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private colorService: ColorService) {}

  addColorMessage = '';
  deleteColorMessage = '';
  editColorMessage = '';

  submitAdd(event: Event): void {
    event.preventDefault();
    if (this.addColorForm.valid) {
      const { name, hex } = this.addColorForm.value;
      this.colorService.addColor(name, hex).subscribe((response) => {
        this.addColorMessage = response.message;
        console.log(`Added color ${name} with hex ${hex}`);
      });
    }
  }

  submitEdit(event: Event): void {
    event.preventDefault();
    if (this.editColorForm.valid) {
      const { name, hex } = this.editColorForm.value;
      this.colorService.editColor(name, hex).subscribe((response) => {
        this.editColorMessage = response.message;
        console.log(`Edited color ${name} to hex ${hex}`);
      });
    }
  }

  submitDelete(event: Event): void {
    event.preventDefault();
    if (this.deleteColorForm.valid) {
      const { name } = this.deleteColorForm.value;
      this.colorService.deleteColor(name).subscribe((response) => {
        this.deleteColorMessage = response.message;
        console.log(`Deleted color ${name}`);
      });
    }
  }

  getAddColorMessage(): string {
    return this.addColorMessage;
  }

  getEditColorMessage(): string {
    return this.editColorMessage;
  }

  getDeleteColorMessage(): string {
    return this.deleteColorMessage;
  }
}

@Injectable({ providedIn: 'root' })
export class ColorService {
  private apiUrl = 'https://cs.colostate.edu/~pjones11/api.php';

  constructor(private http: HttpClient) {}

  public getColors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  public addColor(name: string, hex: string): Observable<any> {
    return this.http.post(this.apiUrl,
      { action: 'add', color_name: name, color_hex: hex },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  public editColor(name: string, hex: string): Observable<any> {
    return this.http.post(this.apiUrl,
      { action: 'edit', color_name: name, color_hex: hex },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  public deleteColor(name: string): Observable<any> {
    return this.http.post(this.apiUrl,
      { action: 'delete', color_name: name },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
