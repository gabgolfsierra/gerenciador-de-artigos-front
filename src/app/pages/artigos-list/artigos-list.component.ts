import { Component } from '@angular/core';
import { Artigo } from '../../models/artigo.model';
import { ArtigoService } from '../../services/artigo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-artigo-form',
  standalone: true,
  templateUrl: './artigo-form.component.html',
  styleUrls: ['./artigo-form.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ArtigoFormComponent {
  keywordsInput = '';
  setoresInput = '';
  outrosAutoresStr = '';

  artigo: Artigo = {

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
    orientador: {  nome: '', sobrenome: '' }
  };
  
    loading = false;


  constructor(private artigoService: ArtigoService) { }

  onSubmit(): void {
    this.artigo.palavrasChave = (this.keywordsInput || '')
      .split(',').map(s => s.trim()).filter(Boolean);

    this.artigo.setoresAtividade = (this.setoresInput || '')
      .split(',').map(s => s.trim()).filter(Boolean);


    this.artigo.outrosAutores = (this.outrosAutoresStr || '')
      .split(';').map(n => n.trim()).filter(Boolean)
      .map(nomeCompleto => {
        const partes = nomeCompleto.split(' ').filter(Boolean);
        const sobrenome = partes.length > 1 ? partes.slice(-1).join(' ') : '';
        const nome = partes.length > 1 ? partes.slice(0, -1).join(' ') : partes[0] || '';
        return {  nome, sobrenome };
      });


    const artigoParaSalvar = { ...this.artigo };
    delete (artigoParaSalvar as any).id;


    this.artigoService.salvarArtigo(artigoParaSalvar).subscribe({
      next: () => alert('Artigo salvo com sucesso!'),
      error: (e) => { console.error(e); alert('Erro ao salvar o artigo.'); }
    });
  }
}

