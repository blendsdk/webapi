import { IAuthenticatedUser } from "../middleware/authentication";
import { findUserByUsernameOrEmail } from "../database/account";
import { t } from "../i18n";

export async function validateUser(username: string, password: string): Promise<IAuthenticatedUser> {
    return new Promise(async (resolve, reject) => {
        const userRecord = await findUserByUsernameOrEmail(username);
        if(userRecord) {
            const rolesRecord = 
        } else {
            reject(t("Invalid username or password!"));
        }
    })
}