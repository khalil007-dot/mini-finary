// src/app/services/action.service.ts

import { Injectable } from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { Observable }     from 'rxjs';
import { environment }    from '../../environments/environment';
import { ActionInvestment } from '../models/action-investment.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private readonly baseUrl = `${environment.apiUrl}/action`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ActionInvestment[]> {
    return this.http.get<ActionInvestment[]>(this.baseUrl);
  }

  getById(id: number): Observable<ActionInvestment> {
    return this.http.get<ActionInvestment>(`${this.baseUrl}/${id}`);
  }

  create(inv: ActionInvestment): Observable<ActionInvestment> {
    return this.http.post<ActionInvestment>(this.baseUrl, inv);
  }

  update(id: number, inv: ActionInvestment): Observable<ActionInvestment> {
    return this.http.put<ActionInvestment>(`${this.baseUrl}/${id}`, inv);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
