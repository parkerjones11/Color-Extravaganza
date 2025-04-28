import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ColorService {
    private apiUrl='https://cs.colostate.edu/~pjones11/api.php';

    constructor(private http: HttpClient) {}

    //Will return an object of colors like: 
    //{{'id': 'red', 'name': 'red', 'hex_value': 'FF0000'}, {'id': .., 'name': ..., 'hex_value': ...},...}
    public getColors(){
        return this.http.get<any[]>(this.apiUrl);
    }

    public addColor(name: string, hex: string): Observable<any>{
        return this.http.post(this.apiUrl,
            {action: 'add', color_name: name, color_hex: hex},
            {headers: {'Content-Type': 'application/json'}}
        );
    }

    public editColor(name: string, hex: string): Observable<any>{
        return this.http.post(this.apiUrl,
            {action: 'edit', color_name: name, color_hex: hex},
            {headers: {'Content-Type': 'application/json'}}
        );
    }

    public deleteColor(name: string): Observable<any>{
        return this.http.post(this.apiUrl,
            {action: 'delete', color_name: name},
            {headers: {'Content-Type': 'application/json'}}
        );
    }
}