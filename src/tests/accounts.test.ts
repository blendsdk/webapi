import "./lib";
import { validateUser } from "../services/accounts";
import { addUser } from "../database/account";

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


// test("addUser & deleteUserByUserID & validateUser", async () => {

// 	const user = await addUser({
// 		username: "user1",
// 		password: "password1",
// 		email: "user@example.com"
// 	});
// 	expect(user.user_id).not.toBeNull();

// 	const userVal = await validateUser("user1", "password11");
// 	expect(isInstanceOf(userVal, Error)).toBe(true);

// 	const userVal2 = await validateUser("user1", "password1");
// 	expect(isInstanceOf(userVal2, Error)).toBe(false);


// 	const delUser = await deleteUserByUserID({ user_id: user.user_id });
// 	expect(delUser).not.toBeNull();
// });