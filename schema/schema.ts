import { PostgreSQLDatabase, createTypes } from "@blendsdk/schemakit";
import * as path from "path";
import { databaseSchema } from "./tables";

createTypes(path.join(process.cwd(), "src", "database", "dbtypes.ts"), databaseSchema.getTables());
