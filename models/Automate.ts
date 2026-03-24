import { Etat } from "./Etats";
import { Transition } from "./Transition";

export type Automate = {
  etats: Etat[];
  transitions: Transition[];
};
