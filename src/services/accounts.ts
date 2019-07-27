import { IAuthenticatedUser } from "../middleware/authentication";
import { findUserByUsernameOrEmail, getUserRolesByUserID, createUser, findRolesByRoleName, createUserRole } from "../database/account";
import { ISysRole, ISysUser } from "../database/dbtypes";
import bcrypt from "bcryptjs";
import { t } from "../i18n";
import { asyncForEach } from "@blendsdk/stdlib";

/**
 * Interface describing a validates user
 *
 * @export
 * @interface IValidateUserResult
 */
export interface IValidateUserResult {
    error?: Error;
    user?: IAuthenticatedUser;
}

/**
 * Given a username and a password this function validates the user
 * and returns the results.
 *
 * @export
 * @param {string} username
 * @param {string} password
 * @returns {Promise<IValidateUserResult>}
 */
export function validateUser(username: string, password: string): Promise<IValidateUserResult> {
    return new Promise(async (resolve, reject) => {
        try {
            const userRecord = await findUserByUsernameOrEmail({ username });
            if (userRecord && await bcrypt.compare(password, userRecord.password)) {
                const rolesRecord = await getUserRolesByUserID({ user_id: userRecord.user_id });
                const user: IAuthenticatedUser = { ...userRecord };
                user.roles = rolesRecord.map((r: ISysRole) => { return r.role_name; });
                resolve({
                    user: user,
                    error: null
                });
            } else {
                resolve({
                    user: null,
                    error: new Error(t("Invalid username or password!!"))
                });
            }
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Adds a new user.
 *
 * @export
 * @param {ISysUser} user
 * @returns {Promise<ISysUser>}
 */
export function addUser(user: ISysUser): Promise<ISysUser> {
    return createUser(user);
}

/**
 * Assigns one or more roles to a user
 *
 * @export
 * @param {number} user_id
 * @param {(string | string[])} roles
 * @returns {Promise<boolean>}
 */
export function assignRolesToUser(user_id: number, roles: string | string[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const rls = await findRolesByRoleName({ roles });
            if (rls.length !== 0) {
                asyncForEach<ISysRole>(rls, async (item: ISysRole) => {
                    await createUserRole({
                        user_id,
                        role_id: item.role_id
                    });
                });
                resolve(true);
            } else {
                reject(`None of the provided roles could be assigned to this user!`);
            }
        } catch (err) {
            reject(err);
        }
    });
}