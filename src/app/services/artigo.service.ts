import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, map, tap } from 'rxjs';
import { environment } from '../../environment';
import { Artigo } from '../models/artigo.model'; 

@Injectable({ providedIn: 'root' })
export class ArtigoService {
  private baseUrl = `${environment.apiUrl}/artigo`;

   constructor(private http: HttpClient) {}

  salvarArtigo(artigo: Artigo): Observable<Artigo> {
    return this.http.post<Artigo>(this.baseUrl, artigo);
  }

  listarArtigos(): Observable<Artigo[]> {
    return this.http.get<Artigo[]>(this.baseUrl);
  }
}