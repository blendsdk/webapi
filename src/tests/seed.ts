import chalk from "chalk";
import * as path from "path";
import * as fs from "fs";
import { asyncForEach } from "@blendsdk/stdlib";
import dotenv from "dotenv";
import { createConnection, closeConnection, sql_insert } from "@blendsdk/sqlkit";

const envFile = process.argv[2] || ".env";
dotenv.config({ path: envFile });
console.log(chalk.green(`Using the ${envFile}`));

const connection = createConnection();

(async () => {
    console.log(chalk.green("Seeding DB"));
    const sql = fs
        .readFileSync(path.join(process.cwd(), "src", "tests", "seed.sql"))
        .toString()
        .split(";");
    await asyncForEach(sql, async stmt => {
        await connection.query(stmt);
        process.stdout.write(".");
    });
    console.log();
    await closeConnection();
})();
