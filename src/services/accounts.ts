import { IAuthenticatedUser, getJWTSecret } from "../middleware/authentication";
import { findUserByUsernameOrEmail, getUserRolesByUserID } from "../database/account";
import { ISysRole } from "../database/dbtypes";
import bcrypt from "bcryptjs";
import { t } from "../i18n";

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