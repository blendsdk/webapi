import "./lib";
import { validateUser } from "../services/accounts";
import { addUser, findRolesByRoleName } from "../database/account";

test("validateUser (valid)", async () => {
	const result1 = await validateUser("user1", "secret");
	expect(result1.error).toBeNull();
});

test("validateUser (invalid)", async () => {
	const result2 = await validateUser("user1", "*****");
	expect(result2.error).not.toBeNull();
});

test("addUser", async () => {
	const user = await addUser({
		username: "user2",
		password: "secret",
		email: "user2@example.com"
	});
	expect(user.password).not.toEqual("secret");
});

test("getRoles", async () => {
	const roles = await findRolesByRoleName({
		role: ["role1", "role3", "role9"]
	});
	expect(roles.length).toEqual(2);
});