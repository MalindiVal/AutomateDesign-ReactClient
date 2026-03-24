import { Etat } from "./Etats";

export type Transition = {
  id: string;
  etatDebut: Etat;
  etatFinal: Etat;
  condition: string;
};
