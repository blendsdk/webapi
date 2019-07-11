import { login, POST } from "./lib";

test("Sanity test with login", () => {
	login("admin", "hello123", () => {
		expect(true);
	});
});
