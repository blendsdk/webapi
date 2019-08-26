import chalk from "chalk";
import * as path from "path";
import { asyncForEach } from "@blendsdk/stdlib";
import { generateInterfacesFromTables, generateDataAccessLayer, generateRestFramework } from "@blendsdk/codekit";
import dotenv from "dotenv";
import { createConnection, closeConnection } from "@blendsdk/sqlkit";
import { database } from "./database";
import { apiSpec } from "./apispec";
import { testApiSpec } from "./test_apispec";

const envFile = process.argv[2] || ".env";
dotenv.config({ path: envFile });
console.log(chalk.green(`Using the ${envFile}`));

console.log(chalk.green("Creating DB Types"));
generateInterfacesFromTables(path.join(process.cwd(), "src", "database", "dbtypes.ts"), database.getTables());

console.log(chalk.green("Creating Routes"));
generateRestFramework(apiSpec, {
    routerOutFile: "src/routes.ts",
    routerTypesOutFile: "src/common/api_types.ts",
    clientOutFile: "../temp/client.ts",
    clientTypesOutFile: "../temp/api_types.ts"
});
generateRestFramework(testApiSpec, {
    routerOutFile: "src/tests/routes.ts",
    routerTypesOutFile: "src/tests/test_api_types.ts",
    clientOutFile: "../temp/test/client.ts",
    clientTypesOutFile: "../test/temp/api_types.ts"
});

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
