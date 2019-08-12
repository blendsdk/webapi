// import { createConnection } from "@blendsdk/sqlkit";
// import { save_vars } from "./lib";
// import { asyncForEach } from "@blendsdk/stdlib";
// import { insertIntoSysConfig, updateSysConfigByConfigId } from "../database/crud";

// test("insertIntoSysConfig", async () => {
//     save_vars("1", "2");
//     createConnection();

//     const config = await insertIntoSysConfig({
//         config: "test",
//         value: 1 as any
//     });

//     asyncForEach([1, 2, 3, 4, 5], async i => {
//         await insertIntoSysConfig({
//             config: "test_" + i,
//             value: i.toString()
//         });
//     });

//     await updateSysConfigByConfigId(
//         {
//             value: "hello"
//         },
//         config
//     );
// });
