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

const api_login = async (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axios
            .post("http://127.0.0.1:3000/api/login", {
                username: username,
                password: password
            })
            .then(res => {
                token = res.data.token;
                resolve(true);
            })
            .catch(error => {
                console.log(JSON.stringify(error.response ? error.response.data : error, null, 4));
                reject(error.response.data);
            });
    });
};

function api_call<ReturnType>(method: string, api: string, data: any): Promise<ReturnType> {
    return new Promise((resolve, reject) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        last_api = `http://127.0.0.1:3000/api${api}`;
        last_data = method === "get" ? api : data || {};
        axios({
            method: method as any,
            url: last_api as any,
            data: last_data as any
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                const err = { request: data, err: error.response ? error.response.data : error };
                fail(JSON.stringify(err, null, 4));
                reject(err);
            });
    });
}

function POST<ReturnType>(api: string, data: any): Promise<ReturnType> {
    return api_call<ReturnType>("post", api, data);
}

function GET<ReturnType>(api: string, data: any): Promise<ReturnType> {
    return api_call<ReturnType>("get", api, data);
}

function PUT<ReturnType>(api: string, data: any): Promise<ReturnType> {
    return api_call<ReturnType>("put", api, data);
}

function PATCH<ReturnType>(api: string, data: any): Promise<ReturnType> {
    return api_call<ReturnType>("patch", api, data);
}

function DELETE<ReturnType>(api: string, data: any): Promise<ReturnType> {
    return api_call<ReturnType>("delete", api, data);
}

afterAll(async () => {
    await closeConnection();
});

beforeAll(async () => {
    const conn = createConnection();
});

export { POST, GET, PUT, PATCH, DELETE, api_login, save_vars, load_vars };
