export interface Votacion {
  id: string;
  userName: string;
  pregunta: string;
  votoNegativo: number;
  votoPositivo: number;
  votoNulo: number;
}
