import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TrabalhoEventoService } from '../../services/trabalho-evento.service';
import { TrabalhoEvento } from '../../models/trabalho-evento.model';

@Component({
  selector: 'app-trabalho-evento-form',
  standalone: true,
  templateUrl: './trabalho-evento-form.component.html',
  styleUrls: ['./trabalho-evento-form.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TrabalhoEventoFormComponent {
  keywordsInput = '';
  setoresInput = '';
  areasGrande = '';
  areasArea = '';
  areasSub = '';

  trabalho: TrabalhoEvento = this.criarTrabalhoVazio();
  loading = false;

  constructor(private service: TrabalhoEventoService) {}

  private criarTrabalhoVazio(): TrabalhoEvento {
    return {
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
      observacoes: '',
    };
  }

  private parseListaPorVirgula(valor: string): string[] {
    return (valor || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  private hidratarCamposDerivados(): void {
    this.trabalho.palavrasChave = this.parseListaPorVirgula(this.keywordsInput);
    this.trabalho.setoresAtividade = this.parseListaPorVirgula(this.setoresInput);

    if (!this.trabalho.areasCNPq?.length) {
      this.trabalho.areasCNPq = [{ grandeArea: '', area: '', subarea: '' }];
    }

    if (this.areasGrande || this.areasArea || this.areasSub) {
      this.trabalho.areasCNPq[0] = {
        grandeArea: this.areasGrande || '',
        area: this.areasArea || '',
        subarea: this.areasSub || '',
      };
    }
  }

  private resetarFormulario(form: NgForm): void {
    this.trabalho = this.criarTrabalhoVazio();
    this.keywordsInput = '';
    this.setoresInput = '';
    this.areasGrande = '';
    this.areasArea = '';
    this.areasSub = '';
    form.resetForm(this.trabalho);
  }

private obterCamposObrigatoriosFaltando() {
  const faltando: { name: string; label: string }[] = [];

  if (!this.trabalho.titulo?.trim()) {
    faltando.push({ name: 'titulo', label: 'Título do trabalho' });
  }

  if (!this.trabalho.anoPublicacao?.trim()) {
    faltando.push({ name: 'anoPublicacao', label: 'Ano de publicação' });
  }

  if (!this.trabalho.idioma?.trim()) {
    faltando.push({ name: 'idioma', label: 'Idioma' });
  }

  if (!this.trabalho.meioDivulgacao?.trim()) {
    faltando.push({ name: 'meioDivulgacao', label: 'Meio de divulgação' });
  }

  if (!this.trabalho.autor?.nome?.trim()) {
    faltando.push({ name: 'autorNome', label: 'Autor – Nome' });
  }

  if (!this.trabalho.autor?.sobrenome?.trim()) {
    faltando.push({ name: 'autorSobrenome', label: 'Autor – Sobrenome' });
  }

  if (!this.trabalho.nomeEvento?.trim()) {
    faltando.push({ name: 'nomeEvento', label: 'Nome do evento' });
  }

  if (!this.trabalho.cidadeEvento?.trim()) {
    faltando.push({ name: 'cidadeEvento', label: 'Cidade do evento' });
  }

  if (!this.trabalho.paisEvento?.trim()) {
    faltando.push({ name: 'paisEvento', label: 'País do evento' });
  }

  if (!this.trabalho.anoEvento?.trim()) {
    faltando.push({ name: 'anoEvento', label: 'Ano do evento' });
  }

  if (!this.areasGrande?.trim()) {
    faltando.push({ name: 'grandeArea', label: 'Grande área CNPq' });
  }

  if (!this.areasArea?.trim()) {
    faltando.push({ name: 'area', label: 'Área CNPq' });
  }

  return faltando;
}


  onSubmit(form: NgForm): void {
    if (this.loading) return;

    const faltando = this.obterCamposObrigatoriosFaltando();

    if (faltando.length > 0) {
      form.control.markAllAsTouched();
      const lista = faltando.map((f) => `- ${f.label}`).join('\n');
      alert(`Preencha os campos obrigatórios antes de salvar:\n\n${lista}`);

      const primeiro = faltando[0];
      const el = document.querySelector(
        `[name="${primeiro.name}"]`
      ) as HTMLElement | null;

      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return;
    }

    this.loading = true;
    this.hidratarCamposDerivados();

    this.service.salvar(this.trabalho).subscribe({
      next: () => {
        alert('Trabalho salvo com sucesso!');
        this.resetarFormulario(form);
        this.loading = false;
      },
      error: () => {
        alert('Erro ao salvar o trabalho.');
        this.loading = false;
      },
    });
  }
}
