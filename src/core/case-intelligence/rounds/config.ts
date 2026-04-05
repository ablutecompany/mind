import { RoundId } from './types';

export const ROUND_LIMITS: Record<RoundId, { min: number, max: number }> = {
  0: { min: 1, max: 2 },
  1: { min: 4, max: 6 },
  2: { min: 4, max: 6 },
  3: { min: 3, max: 5 },
  4: { min: 3, max: 5 },
  5: { min: 2, max: 4 },
  6: { min: 2, max: 3 }
};
