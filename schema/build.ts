import chalk from "chalk";
import * as path from "path";
import { schema } from "./schema"
import { createTypes } from "@blendsdk/schemakit";
import { asyncForEach } from "@blendsdk/stdlib";
import dotenv from "dotenv";
import { createConnection, closeConnection } from "@blendsdk/sqlkit";

dotenv.config({ path: ".env" });

console.log(chalk.green("Creating DB Types"));
createTypes(path.join(process.cwd(), 'dbtypes.ts'), schema.getTables());

const connection = createConnection();

(async () => {
    console.log(chalk.green("Creating DB Tables"));
    const sql = schema.create();
    await asyncForEach(sql, async (stmt) => {
        await connection.query(stmt);
        process.stdout.write('.');
    });
    console.log();
    await closeConnection();
})();