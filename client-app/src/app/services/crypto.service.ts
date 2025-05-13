

import { Injectable } from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { Observable }     from 'rxjs';
import { environment }    from '../../environments/environment';
import { CryptoInvestment } from '../models/crypto.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly baseUrl = `${environment.apiUrl}/crypto`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CryptoInvestment[]> {
    return this.http.get<CryptoInvestment[]>(this.baseUrl);
  }

  getById(id: number): Observable<CryptoInvestment> {
    return this.http.get<CryptoInvestment>(`${this.baseUrl}/${id}`);
  }

  create(inv: CryptoInvestment): Observable<CryptoInvestment> {
    return this.http.post<CryptoInvestment>(this.baseUrl, inv);
  }

  update(id: number, inv: CryptoInvestment): Observable<CryptoInvestment> {
    return this.http.put<CryptoInvestment>(`${this.baseUrl}/${id}`, inv);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
