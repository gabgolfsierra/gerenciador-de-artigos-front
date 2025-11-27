import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { Artigo } from '../../models/artigo.model';
import { ArtigoService } from '../../services/artigo.service';

@Component({
  selector: 'app-artigo-form',
  standalone: true,
  templateUrl: './artigo-form.component.html',
  styleUrls: ['./artigo-form.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ArtigoFormComponent {
  keywordsInput = '';
  setoresInput = '';
  outrosAutoresStr = '';

  artigo: Artigo = this.criarArtigoVazio();
  loading = false;

  constructor(private artigoService: ArtigoService) {}

  private criarArtigoVazio(): Artigo {
    return {
      titulo: '',
      anoPublicacao: '',
      idioma: '',
      meioDivulgacao: '',
      homepageUrl: '',
      doi: '',
      autor: { nome: '', sobrenome: '' },
      coautor: { nome: '', sobrenome: '' },
      outrosAutores: [],
      tituloPeriodico: '',
      issn: '',
      volume: '',
      numero: '',
      serie: '',
      paginaInicial: '',
      paginaFinal: '',
      artigoEletronico: '',
      palavrasChave: [],
      areasCNPq: [{ grandeArea: '', area: '', subarea: '' }],
      setoresAtividade: [],
      outrasInformacoes: '',
      tituloIngles: '',
      outrasInformacoesIngles: '',
      instituicao: '',
      orientador: { nome: '', sobrenome: '' },
    };
  }

  private parseListaPorVirgula(valor: string): string[] {
    return (valor || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  private parseOutrosAutores(valor: string): { nome: string; sobrenome: string }[] {
    return (valor || '')
      .split(';')
      .map((n) => n.trim())
      .filter(Boolean)
      .map((nomeCompleto) => {
        const partes = nomeCompleto.split(' ').filter(Boolean);
        const sobrenome = partes.length > 1 ? partes.slice(-1).join(' ') : '';
        const nome =
          partes.length > 1 ? partes.slice(0, -1).join(' ') : partes[0] || '';

        return { nome, sobrenome };
      });
  }

  private hidratarCamposDerivados(): void {
    this.artigo.palavrasChave = this.parseListaPorVirgula(this.keywordsInput);
    this.artigo.setoresAtividade = this.parseListaPorVirgula(this.setoresInput);
    this.artigo.outrosAutores = this.parseOutrosAutores(this.outrosAutoresStr);
  }

  private resetarFormulario(form: NgForm): void {
    this.artigo = this.criarArtigoVazio();
    this.keywordsInput = '';
    this.setoresInput = '';
    this.outrosAutoresStr = '';

    form.resetForm(this.artigo);
  }

  private obterCamposObrigatoriosFaltando() {
  const faltando: { name: string; label: string }[] = [];

  if (!this.artigo.doi?.trim()) {
    faltando.push({ name: 'doi', label: 'DOI do artigo' });
  }

  if (!this.artigo.titulo?.trim()) {
    faltando.push({ name: 'titulo', label: 'Título do artigo' });
  }

  if (!this.artigo.autor?.nome?.trim()) {
    faltando.push({ name: 'autorNome', label: 'Autor – Nome' });
  }

  if (!this.artigo.autor?.sobrenome?.trim()) {
    faltando.push({ name: 'autorSobrenome', label: 'Autor – Sobrenome' });
  }

  if (!this.artigo.areasCNPq?.[0]?.grandeArea?.trim()) {
    faltando.push({ name: 'grandeArea0', label: 'Grande área (CNPq)' });
  }

  if (!this.artigo.areasCNPq?.[0]?.area?.trim()) {
    faltando.push({ name: 'area0', label: 'Área (CNPq)' });
  }

  if (!this.artigo.instituicao?.trim()) {
    faltando.push({ name: 'instituicao', label: 'Instituição' });
  }

  if (!this.artigo.orientador?.nome?.trim()) {
    faltando.push({ name: 'orientadorNome', label: 'Orientador – Nome' });
  }

  if (!this.artigo.orientador?.sobrenome?.trim()) {
    faltando.push({ name: 'orientadorSobrenome', label: 'Orientador – Sobrenome' });
  }

  return faltando;
}


  onSubmit(form: NgForm): void {
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

    this.hidratarCamposDerivados();

    const artigoParaSalvar: any = { ...this.artigo };
    delete artigoParaSalvar.id;

    this.loading = true;

    this.artigoService.salvarArtigo(artigoParaSalvar).subscribe({
      next: () => {
        alert('Artigo salvo com sucesso!');
        this.resetarFormulario(form);
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        alert('Erro ao salvar o artigo.');
        this.loading = false;
      },
    });
  }
}
