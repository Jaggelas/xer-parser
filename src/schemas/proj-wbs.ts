import { Moment } from 'moment';
import {
	optionalDate,
	optionalNumber,
	optionalString
} from '../utilities/string-convert';
import { XER } from '../xer';
import { Project } from './project';
import { Task } from './task';

/**
 * Represents a Work Breakdown Structure (WBS) element in a project.
 * WBS elements are used to organize and define the total scope of the project.
 */
export class ProjWBS {
	/**
	 * The parent XER object containing all project data
	 */
	public xer: XER;
	/**
	 * Unique identifier for the WBS element
	 */
	public wbsId: number;
	/**
	 * ID of the project this WBS belongs to
	 */
	public projId: number;
	/**
	 * Organizational Breakdown Structure ID
	 */
	public obsId: number;
	/**
	 * Sequence number for ordering
	 */
	public seqNum: number;
	/**
	 * Estimated weight of the WBS element
	 */
	public estWt: number;
	/**
	 * Indicates if this is a project node
	 */
	public projNodeFlag: boolean;
	/**
	 * Indicates if this element summarizes data
	 */
	public sumDataFlag: boolean;
	/**
	 * Current status of the WBS element
	 */
	public statusCode: string;
	/**
	 * Short name/code for the WBS element
	 */
	public wbsShortName: string;
	/**
	 * Full name of the WBS element
	 */
	public wbsName: string;
	/**
	 * Optional phase identifier
	 */
	public phaseId?: number;
	/**
	 * ID of the parent WBS element if any
	 */
	public parentWbsId?: number;
	/**
	 * Earned value user percentage
	 */
	public evUserPct: number;
	/**
	 * Earned value estimate to complete user value
	 */
	public evEtcUserValue: number;
	/**
	 * Original cost if specified
	 */
	public origCost?: number;
	/**
	 * Independent remaining total cost
	 */
	public indepRemainTotalCost?: number;
	/**
	 * Annual discount rate percentage
	 */
	public annDscntRatePct?: number;
	/**
	 * Discount period type
	 */
	public dscntPeriodType?: string;
	/**
	 * Independent remaining work quantity
	 */
	public indepRemainWorkQty?: number;
	/**
	 * Anticipated start date
	 */
	public anticipStartDate?: Moment;
	/**
	 * Anticipated end date
	 */
	public anticipEndDate?: Moment;
	/**
	 * Earned value computation type
	 */
	public evComputeType: string;
	/**
	 * ETC computation type
	 */
	public evEtcComputeType: string;
	/**
	 * Globally unique identifier
	 */
	public guid: string;
	/**
	 * Template GUID if applicable
	 */
	public tmplGuid?: string;
	/**
	 * Planning open state
	 */
	public planOpenState?: string;

	/**
	 * Creates a new instance of the WBS (Work Breakdown Structure) class from XER data
	 * @param _xer - The XER object containing the project data
	 * @param header - Array of column headers from the XER file
	 * @param row - Array of values corresponding to the headers
	 *
	 * @remarks
	 * This constructor maps XER data to WBS properties including:
	 * - Basic identifiers (wbsId, projId, obsId)
	 * - Hierarchical info (parentWbsId, seqNum)
	 * - Naming (wbsName, wbsShortName)
	 * - Status flags (projNodeFlag, sumDataFlag, statusCode)
	 * - Cost related fields (origCost, indepRemainTotalCost)
	 * - Earned value fields (evUserPct, evEtcUserValue, evComputeType)
	 * - Dates (anticipStartDate, anticipEndDate)
	 * - Other attributes (guid, tmplGuid, planOpenState)
	 */
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
		this.indepRemainTotalCost = optionalNumber(
			row[header.indexOf('indep_remain_total_cost')]
		);
		this.annDscntRatePct = optionalNumber(
			row[header.indexOf('ann_dscnt_rate_pct')]
		);
		this.dscntPeriodType = row[header.indexOf('dscnt_period_type')];
		this.indepRemainWorkQty = optionalNumber(
			row[header.indexOf('indep_remain_work_qty')]
		);
		this.anticipStartDate = optionalDate(
			row[header.indexOf('anticip_start_date')]
		);
		this.anticipEndDate = optionalDate(
			row[header.indexOf('anticip_end_date')]
		);
		this.evComputeType = row[header.indexOf('ev_compute_type')];
		this.evEtcComputeType = row[header.indexOf('ev_etc_compute_type')];
		this.guid = row[header.indexOf('guid')];
		this.tmplGuid = optionalString(row[header.indexOf('tmpl_guid')]);
		this.planOpenState = row[header.indexOf('plan_open_state')];
	}

	/**
	 * Gets the associated project for the current WBS.
	 * @returns {Project} The project associated with the WBS's projId.
	 * @throws {Error} Implicitly throws if no project is found (due to non-null assertion).
	 */
	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}

	/**
	 * Gets all tasks associated with this WBS element.
	 * Filters the project's task list to return only tasks with matching WBS IDs.
	 * @returns An array of Task objects belonging to this WBS element
	 */
	public get tasks(): Task[] {
		return this.xer.tasks.filter((task) => task.wbsId === this.wbsId);
	}
}
