import { api_login, POST } from "./lib";

test("API /account/create", async () => {
    if (await api_login("admin", "secret")) {
        const user = "user" + new Date().getTime();
        const result: any = await POST("/account/create", {
            roles: ["role1"],
            username: user,
            password: "secret",
            email: user,
            first_name: "john",
            last_name: "doe",
            gender: "m"
        });
        expect(result.password).toEqual("test");
    } else {
        fail("Invalid user name or password!");
    }
});