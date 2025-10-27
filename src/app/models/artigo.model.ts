import { Pessoa } from './pessoa.model';

export interface AreaCNPq {
  grandeArea: string;
  area: string;
  subarea: string;
}

export interface Artigo {
  id?: number;

  titulo: string;
  anoPublicacao: string;
  idioma: string;
  meioDivulgacao: string;
  homepageUrl: string;

  doi: string;

  autor: Pessoa | null;
  coautor: Pessoa | null;
  outrosAutores: Pessoa[];

  tituloPeriodico: string;
  issn: string;
  volume: string;
  numero: string;
  serie: string;
  paginaInicial: string;
  paginaFinal: string;
  artigoEletronico: string;

  palavrasChave: string[];
  areasCNPq: AreaCNPq[];
  setoresAtividade: string[];

  outrasInformacoes: string;

  tituloIngles: string;
  outrasInformacoesIngles: string;

  instituicao: string;
  orientador: Pessoa | null;
}
