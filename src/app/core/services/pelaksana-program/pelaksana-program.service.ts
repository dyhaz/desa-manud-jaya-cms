import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PelaksanaProgram {
  id?: number;
  nama_pelaksana: string;
  jabatan: string;
  kontak: string;
  program_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PelaksanaProgramService {

  private baseUrl = environment.apiUrl + '/pelaksana-program';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<PelaksanaProgram[]>(`${this.baseUrl}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<PelaksanaProgram>(`${this.baseUrl}`, data);
  }

  getById(id: number): Observable<any> {
    return this.http.get<PelaksanaProgram>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
