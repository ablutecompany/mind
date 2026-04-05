import { EvidenceSignal } from '../../types';

export const caseDTrabalhoDesgasteLedger: EvidenceSignal[] = [
  {
    id: "f1", domain: "trabalho_desgaste_reconhecimento", signalType: "pain", label: "erosao_diaria_pura", strength: 0.9, polarity: "supporting", objectRef: "trabalho"
  },
  {
    id: "f2", domain: "trabalho_desgaste_reconhecimento", signalType: "constraint", label: "dependencia_salarial_para_sobreviver", strength: 0.8, polarity: "supporting"
  },
  {
    id: "f3", domain: "corpo_tensao_alerta", signalType: "pain", label: "exaustao_fisica", strength: 0.85, polarity: "supporting"
  },
  // Contradictors
  {
    id: "f4", domain: "trabalho_desgaste_reconhecimento", signalType: "support", label: "problema_trabalho_puro", strength: 0.85, polarity: "supporting" 
  },
  {
    id: "f5", domain: "trabalho_desgaste_reconhecimento", signalType: "support", label: "cura_com_mudanca", strength: 0.8, polarity: "supporting" 
  }
];
