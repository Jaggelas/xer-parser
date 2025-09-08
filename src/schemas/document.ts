import { XER } from '../xer';
import { BaseSchema } from './base-schema';
import { Dayjs } from '../utilities/dayjs';

export class Document extends BaseSchema {
  public xer: XER;
  public docId!: number;
  public docSeqNum!: number;
  public delivFlag!: boolean;
  public docName!: string;
  public parentDocId?: number;
  public projId!: number;
  public docStatusId?: number;
  public docCatgId?: number;
  public docDate?: Dayjs;
  public versionName?: string;
  public guid!: string;
  public tmplGuid?: string;
  public docShortName?: string;
  public authorName?: string;
  public privateLoc?: string;
  public publicLoc?: string;
  public docMgmtType!: string;
  public crExternalDocKey?: string;
  public docContent?: string;

  constructor(_xer: XER, header: string[], row: string[]) {
    super(_xer);
    this.xer = _xer;
    this.populateFrom('DOCUMENT', header, row);
  }
}
