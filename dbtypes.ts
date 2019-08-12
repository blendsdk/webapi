/**
 * Interface describing a sys_config record.
 *
 * @interface ISysConfig
 * @export
 */
export interface ISysConfig {
    config_id?: number;
    config?: string;
    value?: string;
}

/**
 * Interface describing a sys_i18n record.
 *
 * @interface ISysI18n
 * @export
 */
export interface ISysI18n {
    id?: number;
    locale?: string;
    key?: string;
    value?: string;
}

/**
 * Interface describing a sys_user record.
 *
 * @interface ISysUser
 * @export
 */
export interface ISysUser {
    user_id?: number;
    username?: string;
    password?: string;
    email?: string;
    is_active?: boolean;
}

/**
 * Interface describing a sys_role record.
 *
 * @interface ISysRole
 * @export
 */
export interface ISysRole {
    role_id?: number;
    role_name?: string;
}

/**
 * Interface describing a sys_user_role record.
 *
 * @interface ISysUserRole
 * @export
 */
export interface ISysUserRole {
    user_role_id?: number;
    user_id?: number;
    role_id?: number;
}

/**
 * Interface describing a sys_user_profile record.
 *
 * @interface ISysUserProfile
 * @export
 */
export interface ISysUserProfile {
    user_profile_id?: number;
    gender?: string;
    title?: string;
    first_name?: string;
    last_name?: string;
    user_id?: number;
}