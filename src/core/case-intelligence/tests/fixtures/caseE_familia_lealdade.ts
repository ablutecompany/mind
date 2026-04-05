import { EvidenceSignal } from '../../types';

export const caseEFamiliaLealdadeLedger: EvidenceSignal[] = [
  {
    id: "f1", domain: "familia_lealdade_papel", signalType: "constraint", label: "papel_exigido_hereditario", strength: 0.9, polarity: "supporting", objectRef: "familia"
  },
  {
    id: "f2", domain: "culpa_remorso_omissao", signalType: "pain", label: "medo_de_falhar_aos_outros", strength: 0.85, polarity: "supporting"
  },
  // Contradictor: proves it's real guilt and loyalty, not just a weak habit
  {
    id: "f3", domain: "familia_lealdade_papel", signalType: "support", label: "lealdade_real_base", strength: 0.8, polarity: "supporting"
  },
  {
    id: "f4", domain: "familia_lealdade_papel", signalType: "support", label: "decisao_fuga_clara", strength: 0.9, polarity: "supporting" 
  }
];
