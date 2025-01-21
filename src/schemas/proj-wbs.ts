import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';
import {Project} from './project';
import {Task} from './task';

export class ProjWBS {
	public xer: XER;
	public wbsId: number;
	public projId: number;
	public obsId: number;
	public seqNum: number;
	public estWt: number;
	public projNodeFlag: boolean;
	public sumDataFlag: boolean;
	public statusCode: string;
	public wbsShortName: string;
	public wbsName: string;
	public phaseId?: number;
	public parentWbsId?: number;
	public evUserPct: number;
	public evEtcUserValue: number;
	public origCost?: number;
	public indepRemainTotalCost?: number;
	public annDscntRatePct?: number;
	public dscntPeriodType?: string;
	public indepRemainWorkQty?: number;
	public anticipStartDate?: Date;
	public anticipEndDate?: Date;
	public evComputeType: string;
	public evEtcComputeType: string;
	public guid: string;
	public tmplGuid?: string;
	public planOpenState?: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.wbsId = Number(row[header.indexOf('wbs_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.obsId = Number(row[header.indexOf('obs_id')]);
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.estWt = Number(row[header.indexOf('est_wt')]);
		this.projNodeFlag = row[header.indexOf('proj_node_flag')] === 'Y';
		this.sumDataFlag = row[header.indexOf('sum_data_flag')] === 'Y';
		this.statusCode = row[header.indexOf('status_code')];
		this.wbsShortName = row[header.indexOf('wbs_short_name')];
		this.wbsName = row[header.indexOf('wbs_name')];
		this.phaseId = optionalNumber(row[header.indexOf('phase_id')]);
		this.parentWbsId = optionalNumber(row[header.indexOf('parent_wbs_id')]);
		this.evUserPct = Number(row[header.indexOf('ev_user_pct')]);
		this.evEtcUserValue = Number(row[header.indexOf('ev_etc_user_value')]);
		this.origCost = optionalNumber(row[header.indexOf('orig_cost')]);
		this.indepRemainTotalCost = optionalNumber(row[header.indexOf('indep_remain_total_cost')]);
		this.annDscntRatePct = optionalNumber(row[header.indexOf('ann_dscnt_rate_pct')]);
		this.dscntPeriodType = row[header.indexOf('dscnt_period_type')];
		this.indepRemainWorkQty = optionalNumber(row[header.indexOf('indep_remain_work_qty')]);
		this.anticipStartDate = optionalDate(row[header.indexOf('anticip_start_date')]);
		this.anticipEndDate = optionalDate(row[header.indexOf('anticip_end_date')]);
		this.evComputeType = row[header.indexOf('ev_compute_type')];
		this.evEtcComputeType = row[header.indexOf('ev_etc_compute_type')];
		this.guid = row[header.indexOf('guid')];
		this.tmplGuid = optionalString(row[header.indexOf('tmpl_guid')]);
		this.planOpenState = row[header.indexOf('plan_open_state')];
	}

	public get project(): Project {
		return this.xer.projects.find((project) => project.projId === this.projId)!;
	}

	public get tasks(): Task[] {
		return this.xer.tasks.filter((task) => task.wbsId === this.wbsId);
	}
}
