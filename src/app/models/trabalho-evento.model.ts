export interface Pessoa {
  id?: number | string | null;
  nome: string;
  sobrenome: string;
}

export interface TrabalhoEvento {
  id?: number | string | null;
  titulo: string;
  autor: Pessoa;
  coautor: Pessoa;
  orientador: Pessoa;
  anoPublicacao: string;
  idioma: string;
  doi: string;
  meioDivulgacao: string;
  url: string;

  nomeEvento: string;
  nomeEventoIngles: string;
  cidadeEvento: string;
  paisEvento: string;
  anoEvento: string;
  tituloAnais: string;
  issnIsbn: string;
  volume: string;
  paginaInicial: string;
  paginaFinal: string;

  palavrasChave: string[];
  areasCNPq: { grandeArea: string; area: string; subarea: string }[];
  setoresAtividade: string[];
  observacoes: string;
}
