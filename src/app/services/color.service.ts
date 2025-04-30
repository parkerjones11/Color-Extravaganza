import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ This decorator tells Angular to provide this service globally via root injector.
@Injectable({ providedIn: 'root' })
export class ColorService {
  // URL to your color API endpoint (can be updated to point to local or production server)
  private apiUrl = 'https://cs.colostate.edu/~pjones11/api.php';

  // ✅ Inject HttpClient so we can make HTTP requests
  constructor(private http: HttpClient) {}

  /**
   * Retrieves an array of color objects from the backend.
   * Expected format: [
   *   { id: 'red', name: 'red', hex_value: 'FF0000' },
   *   { id: 'blue', name: 'blue', hex_value: '0000FF' },
   *   ...
   * ]
   */
  public getColors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to add a new color to the database.
   */
  public addColor(name: string, hex: string): Observable<any> {
    return this.http.post(this.apiUrl,
      { action: 'add', color_name: name, color_hex: hex },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  /**
   * Sends a POST request to update an existing color.
   */
  public editColor(name: string, hex: string): Observable<any> {
    return this.http.post(this.apiUrl,
      { action: 'edit', color_name: name, color_hex: hex },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}