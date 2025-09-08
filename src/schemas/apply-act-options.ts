import { XER } from '../xer';
import { BaseSchema } from './base-schema';

export class ApplyActOptions extends BaseSchema {
  public xer: XER;
  public projId!: number;
  public respectDurationType!: string;

  constructor(_xer: XER, header: string[], row: string[]) {
    super(_xer);
    this.xer = _xer;
    this.populateFrom('APPLYACTOPTIONS', header, row);
  }
}
