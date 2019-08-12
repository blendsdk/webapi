import { PostgreSQLDatabase, createTypes } from "@blendsdk/schemakit";
import * as path from "path";

const databaseSchema = new PostgreSQLDatabase();

//// SYSTEM Tables
const sys_config = databaseSchema.addTable("sys_config"),
    sys_user = databaseSchema.addTable("sys_user"),
    sys_role = databaseSchema.addTable("sys_role"),
    sys_user_role = databaseSchema.addTable("sys_user_role"),
    sys_profile = databaseSchema.addTable("sys_user_profile");

sys_config
    .primaryKeyColumn("config_id")
    .stringColumn("config", { unique: true })
    .stringColumn("value");

sys_user
    .primaryKeyColumn("user_id")
    .stringColumn("username", { unique: true })
    .stringColumn("password")
    .stringColumn("email", { unique: true })
    .booleanColumn("is_active", { default: "true" });

sys_role.primaryKeyColumn("role_id").stringColumn("role_name", { unique: true });

sys_user_role
    .primaryKeyColumn("user_role_id")
    .referenceColumn("user_id", sys_user)
    .referenceColumn("role_id", sys_role);

sys_profile
    .primaryKeyColumn("user_profile_id")
    .stringColumn("gender", { required: false })
    .stringColumn("title", { required: false })
    .stringColumn("first_name")
    .stringColumn("last_name")
    .referenceColumn("user_id", sys_user);

export { databaseSchema };
