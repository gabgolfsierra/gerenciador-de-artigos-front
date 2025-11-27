import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artigo } from '../../models/artigo.model';
import { ArtigoService } from '../../services/artigo.service';

@Component({
  selector: 'app-artigos-list',
  standalone: true,
  templateUrl: './artigos-list.component.html',
  styleUrls: ['./artigos-list.component.scss'],
  imports: [CommonModule]
})
export class ArtigosListComponent implements OnInit {
  artigos: Artigo[] = [];
  loading = false;
  error = '';

  constructor(private artigoService: ArtigoService) {}

  ngOnInit(): void {
    this.carregarArtigos();
  }

  carregarArtigos(): void {
    this.loading = true;
    this.error = '';

    this.artigoService.listarArtigos().subscribe({
      next: (dados) => {
        this.artigos = dados || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os artigos.';
        this.loading = false;
      }
    });
  }

  reload(): void {
    if (this.loading) return;
    this.carregarArtigos();
  }

  trackById(index: number, item: Artigo): any {
    return (item as any).id ?? index;
  }
}
