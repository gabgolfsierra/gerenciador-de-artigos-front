import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../..//environment';
import { TrabalhoEvento } from '../models/trabalho-evento.model';

@Injectable({ providedIn: 'root' })
export class TrabalhoEventoService {
  private baseUrl = `${environment.apiUrl}/trabalhos-eventos`;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {}

  salvar(data: TrabalhoEvento): Observable<TrabalhoEvento> {
    const payload = JSON.parse(JSON.stringify(data));
    if (!payload.id) delete payload.id;
    if (payload.autor) delete payload.autor.id;
    if (payload.coautor) delete payload.coautor.id;
    if (payload.orientador) delete payload.orientador.id;
    return this.http.post<TrabalhoEvento>(this.baseUrl, payload, this.httpOptions).pipe(
      tap(),
      catchError(err => throwError(() => err))
    );
  }

  listar(): Observable<TrabalhoEvento[]> {
    return this.http.get<TrabalhoEvento[]>(this.baseUrl).pipe(
      tap(),
      catchError(err => throwError(() => err))
    );
  }
}
