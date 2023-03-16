import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Desa {
  id: number;
  nama_desa: string;
  kecamatan: string;
  kabupaten_kota: string;
  provinsi: string;
  jumlah_penduduk: number;
}

@Injectable({
  providedIn: 'root'
})
export class DesaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDesaById(id: number): Observable<Desa> {
    return this.http.get<Desa>(`${this.apiUrl}/desa/${id}`);
  }

  getAllDesa(): Observable<Desa[]> {
    return this.http.get<Desa[]>(`${this.apiUrl}/desa`);
  }

  createDesa(desa: Desa): Observable<Desa> {
    return this.http.post<Desa>(`${this.apiUrl}/desa`, desa);
  }

  updateDesa(id: number, desa: Desa): Observable<Desa> {
    return this.http.put<Desa>(`${this.apiUrl}/desa/${id}`, desa);
  }

}
