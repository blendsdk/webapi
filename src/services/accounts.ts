import { createUser, findRolesByRoleName, createUserRole } from "../database/account";
import { ISysRole, ISysUser } from "../database/dbtypes";
import { asyncForEach } from "@blendsdk/stdlib";

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
