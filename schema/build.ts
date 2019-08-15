import chalk from "chalk";
import * as path from "path";
import { asyncForEach } from "@blendsdk/stdlib";
import { generateInterfacesFromTables, generateDataAccessLayer } from "@blendsdk/codekit";
import dotenv from "dotenv";
import { createConnection, closeConnection } from "@blendsdk/sqlkit";
import { database } from "./database";

const envFile = process.argv[2] || ".env";
dotenv.config({ path: envFile });
console.log(chalk.green(`Using the ${envFile}`));

console.log(chalk.green("Creating DB Types"));
generateInterfacesFromTables(path.join(process.cwd(), "src", "database", "dbtypes.ts"), database.getTables());

console.log(chalk.green("Creating DB CRUD"));
generateDataAccessLayer(database.getTables(), {
    outDir: "./src/database",
    tables: {
        sys_user: {
            select: false,
            insert: false
        }
    }
});

const connection = createConnection();

(async () => {
    console.log(chalk.green("Creating DB Tables"));
    const sql = database.create();
    await asyncForEach(sql, async stmt => {
        await connection.query(stmt);
        process.stdout.write(".");
    });
    console.log();
    await closeConnection();
})();
