import { XER } from '../xer';
import { BaseSchema } from './base-schema';

export class Phase extends BaseSchema {
  public xer: XER;
  public phaseId!: number;
  public seqNum!: number;
  public phaseName!: string;

  constructor(_xer: XER, header: string[], row: string[]) {
    super(_xer);
    this.xer = _xer;
    this.populateFrom('PHASE', header, row);
  }
}
