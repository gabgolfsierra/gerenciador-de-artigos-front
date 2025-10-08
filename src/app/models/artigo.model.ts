import { Pessoa } from './pessoa.model';

export interface Artigo {
  id: number;
  titulo: string;
  autor: Pessoa | null;
  coautor: Pessoa | null;
  anoPublicacao: string;
  doi: string;
  idioma: string;
  instituicao: string;
  orientador: Pessoa | null;
}