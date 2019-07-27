import "./lib";
import { validateUser, addUser, assignRolesToUser } from "../services/accounts";
import { createUser, findRolesByRoleName } from "../database/account";

test("validateUser (valid)", async () => {
	const result1 = await validateUser("user1", "secret");
	expect(result1.error).toBeNull();
});

test("validateUser (invalid)", async () => {
	const result2 = await validateUser("user1", "*****");
	expect(result2.error).not.toBeNull();
});

test("createUser (DB)", async () => {
	const user = await createUser({
		username: "user2",
		password: "secret",
		email: "user2@example.com"
	});
	expect(user.password).not.toEqual("secret");
});

test("addUser (service)", async () => {
	const user = await addUser({
		username: "user3",
		password: "secret",
		email: "user3@example.com"
	});
	expect(user.password).not.toEqual("secret");
});

test("getRoles", async () => {
	const roles = await findRolesByRoleName({
		roles: ["role1", "role3", "role9"]
	});
	expect(roles.length).toEqual(2);
});

test("assignRolesToUser", async () => {
	const user = await addUser({
		username: "user4",
		password: "secret",
		email: "user4@example.com"
	});
	const result = await assignRolesToUser(user.user_id, ["role1", "role2", "role4"]);
	const vUser = await validateUser("user4", "secret");
	expect(result).toEqual(true);
	expect(vUser.user.roles.length).toEqual(3);
});