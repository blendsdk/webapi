
import { sql_query, sql_insert, IDynamicQuery } from "@blendsdk/sqlkit";
import { ISysUser, ISysRole } from "./dbtypes";
import bcrypt from "bcryptjs";
import { wrapInArray } from "@blendsdk/stdlib";

/**
 * Interface describing the input parameters of deleteUserByUserID
 *
 * @export
 * @interface IDeleteUserByUserID
 */
export interface IDeleteUserByUserID {
    user_id: number;
}

export const deleteUserByUserID = sql_query<ISysUser, IDeleteUserByUserID>(
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
 * Interface describing the input parameters of findUserByUsernameOrEmail
 *
 * @export
 * @interface IFindUserByUsernameOrEmail
 */
export interface IFindUserByUsernameOrEmail {
    username: string;
}

/**
 * Find s user by username or email
 */
export const findUserByUsernameOrEmail = sql_query<ISysUser, IFindUserByUsernameOrEmail>(
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
 * Interface describing the input parameters of getUserRolesByUserID
 *
 * @export
 * @interface IGetUserRolesByUserID
 */
export interface IGetUserRolesByUserID {
    user_id: number;
}

/**
 * Gets user roles by user ID
 */
export const getUserRolesByUserID = sql_query<ISysRole[], IGetUserRolesByUserID>(
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

/**
 * Interface describing input parameters of findRolesByRoleName
 *
 * @export
 * @interface IFindRolesByRoleName
 */
export interface IFindRolesByRoleName {
    role: string | string[];
}

/**
 * Finds role records by role names
 */
export const findRolesByRoleName = sql_query<ISysRole[], IFindRolesByRoleName>(
    (params: IFindRolesByRoleName): IDynamicQuery => {
        const role = wrapInArray(params.role);
        return {
            named: false,
            sql: `select * from sys.role where role_name in (${role.map((a, i) => { return "$" + (i + 1); }).join(",")})`,
            parameters: role
        };
    }
);