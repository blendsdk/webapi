import chalk from "chalk";
import * as path from "path";
import { createTypes } from "@blendsdk/schemakit";
import { asyncForEach } from "@blendsdk/stdlib";
import dotenv from "dotenv";
import { createConnection, closeConnection } from "@blendsdk/sqlkit";
import { databaseSchema } from "tables";

const envFile = process.argv[2] || ".env";
dotenv.config({ path: envFile });
console.log(chalk.green(`Using the ${envFile}`));

console.log(chalk.green("Creating DB Types"));
createTypes(path.join(process.cwd(), "dbtypes.ts"), databaseSchema.getTables());

const connection = createConnection();

(async () => {
    console.log(chalk.green("Creating DB Tables"));
    const sql = databaseSchema.create();
    await asyncForEach(sql, async stmt => {
        await connection.query(stmt);
        process.stdout.write(".");
    });
    console.log();
    await closeConnection();
})();
