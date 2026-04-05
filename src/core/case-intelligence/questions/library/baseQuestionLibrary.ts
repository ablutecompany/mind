import { QuestionNode } from '../types';
import { triageLibrary } from './triageLibrary';
import { discriminatorLibrary } from './discriminatorLibrary';
import { validationLibrary } from './validationLibrary';
import { blockerLibrary } from './blockerLibrary';
import { reentrySeedLibrary } from './reentrySeedLibrary';
import { contradictorLibrary } from './contradictorLibrary';

// Consolidate all the separated domain and function libraries into the single export
export const BASE_QUESTION_LIBRARY: QuestionNode[] = [
  ...triageLibrary,
  ...discriminatorLibrary,
  ...validationLibrary,
  ...blockerLibrary,
  ...reentrySeedLibrary,
  ...contradictorLibrary
];
