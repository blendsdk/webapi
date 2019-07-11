import { PostgreSQLDatabase, createTypes } from "@blendsdk/schemakit";
import * as path from "path";

const db = new PostgreSQLDatabase();

//// SYSTEM Tables
const sys_user = db.addTable("sys.user"),
    sys_role = db.addTable("sys.role"),
    sys_user_role = db.addTable("sys.user_role"),
    sys_profile = db.addTable("sys.user_profile");

sys_user.primaryKeyColumn("user_id")
    .stringColumn("username", { unique: true })
    .stringColumn("password")
    .booleanColumn("is_active");

sys_role.primaryKeyColumn("role_id")
    .stringColumn("role_name", { unique: true });

sys_user_role.primaryKeyColumn("user_role_id")
    .referenceColumn("user_id", sys_user)
    .referenceColumn("role_id", sys_role);

sys_profile
    .primaryKeyColumn("user_profile_id")
    .stringColumn("gender", { required: false })
    .stringColumn("title", { required: false })
    .stringColumn("first_name")
    .stringColumn("last_name")
    .stringColumn("email", { unique: true })
    .referenceColumn("user_id", sys_user);

console.log(db.create());

createTypes(path.join(process.cwd(), "src", "database", "dbtypes.ts"), db.getTables());