import { sql_query } from "@blendsdk/sqlkit";
import { ISysUser } from "./dbtypes";

export const findUserByUsernameOrEmail = sql_query<ISysUser,unknown>(
    `
        SELECT 
            *
        FROM
            sys.user
        WHERE
            lowecase(username) = lowecase(:username) OR
            lowecase(email) = lowercase(:email)
    `
    , { single: true }
);


export const findRolesByUserID = sql_query<{roles:string[]},{user_id:number}>(
    `
        SELECT 
            *
        FROM
            sys.user

    `
);