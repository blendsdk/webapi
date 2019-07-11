/**
 * Interface describing a sys.config record.
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
 * Interface describing a sys.user record.
 *
 * @interface ISysUser
 * @export
 */
export interface ISysUser {
    user_id?: number;
    username?: string;
    password?: string;
    is_active?: boolean;
}

/**
 * Interface describing a sys.role record.
 *
 * @interface ISysRole
 * @export
 */
export interface ISysRole {
    role_id?: number;
    role_name?: string;
}

/**
 * Interface describing a sys.user_role record.
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
 * Interface describing a sys.user_profile record.
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
    email?: string;
    user_id?: number;
}