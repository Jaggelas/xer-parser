import { XER } from '../xer';
import { RoleRate } from './role-rate';
import { BaseSchema } from './base-schema';

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
export class Role extends BaseSchema {
	/**
	 * The parent XER instance containing this role
	 */
	public xer: XER;
	/**
	 * Unique identifier for the role
	 */
	public roleId!: number;
	/**
	 * Optional reference to a parent role's ID
	 */
	public parentRoleId?: number;
	/**
	 * Sequence number for ordering
	 */
	public seqNum!: number;
	/**
	 * Full name of the role
	 */
	public roleName!: string;
	/**
	 * Abbreviated name of the role
	 */
	public roleShortName!: string;
	/**
	 * Optional Project Object Breakdown Structure ID
	 */
	public pobsId?: number;
	/**
	 * Flag indicating if cost quantity linking is enabled
	 */
	public defCostQtyLinkFlag!: boolean;
	/**
	 * Type of cost quantity measurement
	 */
	public costQtyType!: string;
	/**
	 * Optional description of the role
	 */
	public roleDescr?: string;
	/**
	 * Checksum value for data integrity
	 */
	public lastChecksum!: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('ROLES', header, row);
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
