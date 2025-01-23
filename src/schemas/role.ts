import { optionalNumber, optionalString } from '../utilities/string-convert';
import { XER } from '../xer';
import { RoleRate } from './role-rate';

/**
 * Represents a Role entity from XER data.
 * A Role defines labor or resource categories with associated rates and hierarchical relationships.
 *
 * @property xer - The parent XER instance containing this role
 * @property roleId - Unique identifier for the role
 * @property parentRoleId - Optional reference to a parent role's ID
 * @property seqNum - Sequence number for ordering
 * @property roleName - Full name of the role
 * @property roleShortName - Abbreviated name of the role
 * @property pobsId - Optional Project Object Breakdown Structure ID
 * @property defCostQtyLinkFlag - Flag indicating if cost quantity linking is enabled
 * @property costQtyType - Type of cost quantity measurement
 * @property roleDescr - Optional description of the role
 * @property lastChecksum - Checksum value for data integrity
 *
 * @method parentRole - Gets the parent Role object if parentRoleId exists
 * @method childrenRoles - Gets an array of Role objects that have this role as their parent
 * @method roleRates - Gets an array of RoleRate objects associated with this role
 */
export class Role {
	/**
	 * The parent XER instance containing this role
	 */
	public xer: XER;
	/**
	 * Unique identifier for the role
	 */
	public roleId: number;
	/**
	 * Optional reference to a parent role's ID
	 */
	public parentRoleId?: number;
	/**
	 * Sequence number for ordering
	 */
	public seqNum: number;
	/**
	 * Full name of the role
	 */
	public roleName: string;
	/**
	 * Abbreviated name of the role
	 */
	public roleShortName: string;
	/**
	 * Optional Project Object Breakdown Structure ID
	 */
	public pobsId?: number;
	/**
	 * Flag indicating if cost quantity linking is enabled
	 */
	public defCostQtyLinkFlag: boolean;
	/**
	 * Type of cost quantity measurement
	 */
	public costQtyType: string;
	/**
	 * Optional description of the role
	 */
	public roleDescr?: string;
	/**
	 * Checksum value for data integrity
	 */
	public lastChecksum: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.roleId = Number(row[header.indexOf('role_id')]);
		this.parentRoleId = optionalNumber(
			row[header.indexOf('parent_role_id')]
		);
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.roleName = row[header.indexOf('role_name')];
		this.roleShortName = row[header.indexOf('role_short_name')];
		this.pobsId = optionalNumber(row[header.indexOf('pobs_id')]);
		this.defCostQtyLinkFlag =
			row[header.indexOf('def_cost_qty_link_flag')] === 'Y';
		this.costQtyType = row[header.indexOf('cost_qty_type')];
		this.roleDescr = optionalString(row[header.indexOf('role_descr')]);
		this.lastChecksum = Number(row[header.indexOf('last_checksum')]);
	}

	public get parentRole(): Role {
		return this.xer.roles.find(
			(role) => role.roleId === this.parentRoleId
		)!;
	}

	public get childrenRoles(): Role[] {
		return this.xer.roles.filter(
			(role) => role.parentRoleId === this.roleId
		);
	}

	public get roleRates(): RoleRate[] {
		return this.xer.roleRates.filter(
			(roleRate) => roleRate.roleId === this.roleId
		);
	}
}
