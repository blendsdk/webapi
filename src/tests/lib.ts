import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { closeConnection, createConnection } from "@blendsdk/sqlkit";

dotenv.config({ path: ".env.test" });

let token: any = null;
let last_data: any = null;
let last_api: any = null;

const save_vars = (id: string, data: any) => {
	const fileName = path.join(process.cwd(), `.testvars-${id}.json`);
	fs.writeFileSync(fileName, JSON.stringify(data));
};

const load_vars = (id: string) => {
	const fileName = path.join(process.cwd(), `.testvars-${id}.json`);
	return JSON.parse(fs.readFileSync(fileName).toString());
};


const login = async (username: string, password: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		axios.post("http://127.0.0.1:3000/api/login", {
			username: username,
			password: password
		})
			.then((res) => {
				token = res.data.token;
				resolve(true);
			})
			.catch((error) => {
				console.log(JSON.stringify(error.response.data, null, 4));
				reject(error.response.data);
			});
	});
};

const api_call = (method: string, api: string, data: any, callback: Function) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] =
			"Bearer " + token;
	}
	last_api = `http://127.0.0.1:3000/api${api}`;
	last_data = method === "get" ? api : data || {};
	axios({
		method: method as any,
		url: last_api as any,
		data: last_data as any
	})
		.then((res) => {
			if (callback) {
				callback(res.data);
			}
		})
		.catch((error) => {
			console.log(error.response.data);
			throw new Error(error.response.data);
		});
};

const POST = (api: string, data: any, callback: Function) => {
	api_call("post", api, data, callback);
};

const GET = (api: string, data: any, callback: Function) => {
	api_call("get", api, data, callback);
};

const PUT = (api: string, data: any, callback: Function) => {
	api_call("put", api, data, callback);
};

const PATCH = (api: string, data: any, callback: Function) => {
	api_call("patch", api, data, callback);
};

const DELETE = (api: string, data: any, callback: Function) => {
	api_call("delete", api, data, callback);
};

afterAll(async () => {
	await closeConnection();
});

beforeAll(async () => {
	const conn = createConnection();
	await conn.query(fs.readFileSync(path.join(process.cwd(), "src", "tests", "seed.sql")).toString());
});

export {
	POST,
	GET,
	PUT,
	PATCH,
	DELETE,
	login,
	save_vars,
	load_vars
};