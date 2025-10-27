import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrabalhoEventoService } from '../../services/trabalho-evento.service';
import { TrabalhoEvento } from '../../models/trabalho-evento.model';

@Component({
  selector: 'app-trabalho-evento-form',
  standalone: true,
  templateUrl: './trabalho-evento-form.component.html',
  styleUrls: ['./trabalho-evento-form.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TrabalhoEventoFormComponent {
  keywordsInput = '';
  setoresInput = '';
  areasGrande = '';
  areasArea = '';
  areasSub = '';

  trabalho: TrabalhoEvento = {
    titulo: '',
    autor: { nome: '', sobrenome: '' },
    coautor: { nome: '', sobrenome: '' },
    orientador: { nome: '', sobrenome: '' },
    anoPublicacao: '',
    idioma: '',
    doi: '',
    meioDivulgacao: '',
    url: '',
    nomeEvento: '',
    nomeEventoIngles: '',
    cidadeEvento: '',
    paisEvento: '',
    anoEvento: '',
    tituloAnais: '',
    issnIsbn: '',
    volume: '',
    paginaInicial: '',
    paginaFinal: '',
    palavrasChave: [],
    areasCNPq: [{ grandeArea: '', area: '', subarea: '' }],
    setoresAtividade: [],
    observacoes: ''
  };

  loading = false;

  constructor(private service: TrabalhoEventoService) {}

  onSubmit(): void {
    if (this.loading) return;
    this.loading = true;

    this.trabalho.palavrasChave = (this.keywordsInput || '').split(',').map(s => s.trim()).filter(Boolean);
    this.trabalho.setoresAtividade = (this.setoresInput || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!this.trabalho.areasCNPq?.length) {
      this.trabalho.areasCNPq = [{ grandeArea: '', area: '', subarea: '' }];
    }
    if (this.areasGrande || this.areasArea || this.areasSub) {
      this.trabalho.areasCNPq[0] = {
        grandeArea: this.areasGrande || '',
        area: this.areasArea || '',
        subarea: this.areasSub || ''
      };
    }

    this.service.salvar(this.trabalho).subscribe({
      next: () => { this.loading = false; alert('Trabalho salvo com sucesso!'); },
      error: () => { this.loading = false; alert('Erro ao salvar o trabalho.'); }
    });
  }
}
