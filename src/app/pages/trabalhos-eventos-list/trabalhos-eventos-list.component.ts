import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabalhoEvento } from '../../models/trabalho-evento.model';
import { TrabalhoEventoService } from '../../services/trabalho-evento.service';

@Component({
  selector: 'app-trabalhos-eventos-list',
  standalone: true,
  templateUrl: './trabalhos-eventos-list.component.html',
  styleUrls: ['./trabalhos-eventos-list.component.scss'],
  imports: [CommonModule],
})
export class TrabalhosEventosListComponent implements OnInit {
  trabalhos: TrabalhoEvento[] = [];
  loading = false;
  error = '';

  constructor(private service: TrabalhoEventoService) {}

  ngOnInit(): void {
    this.carregarTrabalhos();
  }

  carregarTrabalhos(): void {
    this.loading = true;
    this.error = '';

    this.service.listar().subscribe({
      next: (dados) => {
        this.trabalhos = dados || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os trabalhos.';
        this.loading = false;
      },
    });
  }

  reload(): void {
    if (this.loading) return;
    this.carregarTrabalhos();
  }

  trackById(index: number, item: TrabalhoEvento): any {
    return (item as any).id ?? index;
  }
}
