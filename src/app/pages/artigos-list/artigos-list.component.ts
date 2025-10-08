import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

type Pessoa = { id: number; nome: string; sobrenome: string };
type Artigo = {
  id: number;
  titulo: string;
  autor: Pessoa | null;
  coautor: Pessoa | null;
  anoPublicacao: string;
  doi: string;
  idioma: string;
  instituicao: string;
  orientador: Pessoa | null;
};

@Component({
  selector: 'app-artigos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artigos-list.component.html',
  styleUrls: ['./artigos-list.component.scss'],
})
export class ArtigosListComponent implements OnInit {
  artigos: Artigo[] = [];
  loading = false;
  errorMsg = '';
  private readonly baseUrl = '/artigo'; // proxy já cuida disso

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.http.get<Artigo[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.artigos = data ?? [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Erro ao carregar artigos.';
        this.loading = false;
      },
    });
  }

  pessoaNome(p?: Pessoa | null): string {
    return p ? `${p.nome} ${p.sobrenome ?? ''}`.trim() : '—';
  }
}
