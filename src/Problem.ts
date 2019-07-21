import Constraint from './Constraint';

export default interface Problem {
  domains: number[][];
  constraints: Constraint[];
}
