

import { Injectable } from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { Observable }     from 'rxjs';
import { environment }    from '../../environments/environment';
import { EpargneInvestment } from '../models/epargne-investment.model';

@Injectable({
  providedIn: 'root'
})
export class EpargneService {
  private readonly baseUrl = `${environment.apiUrl}/epargne`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EpargneInvestment[]> {
    return this.http.get<EpargneInvestment[]>(this.baseUrl);
  }

  getById(id: number): Observable<EpargneInvestment> {
    return this.http.get<EpargneInvestment>(`${this.baseUrl}/${id}`);
  }

  create(inv: EpargneInvestment): Observable<EpargneInvestment> {
    return this.http.post<EpargneInvestment>(this.baseUrl, inv);
  }

  update(id: number, inv: EpargneInvestment): Observable<EpargneInvestment> {
    return this.http.put<EpargneInvestment>(`${this.baseUrl}/${id}`, inv);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
