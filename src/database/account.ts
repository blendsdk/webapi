
import { sql_query, sql_insert } from "@blendsdk/sqlkit";
import { ISysUser, ISysRole } from "./dbtypes";
import bcrypt from "bcryptjs";

export const deleteUserByUserID = sql_query<ISysUser, { user_id: number }>(
    `delete from sys.user where user_id = :user_id returning *`
    ,
    { single: true }
);


/**
 * Adds a sys.user record
 */
export const addUser = sql_insert<ISysUser, ISysUser>("sys.user", {
    inConverter: (record: ISysUser) => {
        const salt = bcrypt.genSaltSync(12);
        record.password = bcrypt.hashSync(record.password, salt);
        return record;
    }
});

/**
 * Find s user by username or email
 */
export const findUserByUsernameOrEmail = sql_query<ISysUser, { username: string }>(
    `
        select
            *
        from
            sys.user
        where
            lower(username) = lower(:username) OR
            lower(email) = lower(:username)
    `
    , { single: true }
);


/**
 * Gets user roles by user ID
 */
export const getUserRolesByUserID = sql_query<ISysRole[], { user_id: number }>(
    `
        select
            r.*
        from
            sys.role r
            inner join sys.user_role ur on r.role_id = ur.role_id
        where
            ur.user_id = :user_id
    `
);