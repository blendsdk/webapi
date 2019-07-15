import chalk from "chalk";
import * as path from "path";
import { schema } from "./schema";
import { createTypes } from "@blendsdk/schemakit";
import { asyncForEach } from "@blendsdk/stdlib";
import dotenv from "dotenv";
import { createConnection, closeConnection, sql_insert } from "@blendsdk/sqlkit";
import bcrypt from "bcryptjs";

const envFile = process.argv[2] || ".env";
dotenv.config({ path: envFile });
console.log(chalk.green(`Using the ${envFile}`));

console.log(chalk.green("Creating DB Types"));
createTypes(path.join(process.cwd(), "dbtypes.ts"), schema.getTables());

const connection = createConnection();

(async () => {

    console.log(chalk.green("Creating DB Tables"));
    const sql = schema.create();
    await asyncForEach(sql, async (stmt) => {
        await connection.query(stmt);
        process.stdout.write(".");
    });
    console.log();
    await closeConnection();
})();