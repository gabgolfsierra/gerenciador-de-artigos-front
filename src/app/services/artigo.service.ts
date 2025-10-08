import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artigo } from '../models/artigo.model';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class ArtigoService {
  private baseUrl = `${environment.apiUrl}/artigo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Artigo[]> {
    return this.http.get<Artigo[]>(this.baseUrl).pipe(
      // opcional: normalizar algo aqui
      map((list) => list ?? []),
      catchError((err) => {
        console.error('Erro ao buscar artigos', err);
        return throwError(() => err);
      })
    );
  }

  // Deixo prontos para próximos passos:
  getById(id: number): Observable<Artigo> {
    return this.http.get<Artigo>(`${this.baseUrl}/${id}`);
  }
  create(payload: Partial<Artigo>): Observable<Artigo> {
    return this.http.post<Artigo>(this.baseUrl, payload);
  }
  update(id: number, payload: Partial<Artigo>): Observable<Artigo> {
    return this.http.put<Artigo>(`${this.baseUrl}/${id}`, payload);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
