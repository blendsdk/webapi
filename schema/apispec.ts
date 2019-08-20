import { IAPISpecification, IAPIComponent } from "@blendsdk/codekit";

const authenticationRequest: IAPIComponent = {
    username: { type: "string" },
    password: { type: "string" },
    language: { type: "string", optional: true }
};

const authenticationResponse: IAPIComponent = {
    success: { type: "boolean" },
    token: { type: "string" }
};

const greetRequest: IAPIComponent = {
    name: { type: "string", optional: true }
};

const greetResponse: IAPIComponent = {
    hello: { type: "string" }
};

const apiSpec: IAPISpecification = {
    application: "api",
    version: 1,
    endpoints: [
        {
            name: "login",
            method: "post",
            absoluteUrl: true,
            url: "/api/login",
            secure: false,
            controller: "loginController",
            imports: [{ name: "loginController", from: "./controllers/authentication/loginController" }],
            request: authenticationRequest,
            response: {
                200: {}
            }
        },
        {
            name: "greet",
            method: "post",
            absoluteUrl: true,
            url: "/api/greet/:name?/name",
            secure: true,
            controller: "greetController",
            imports: [{ name: "greetController", from: "./controllers/authentication/greetController" }],
            request: greetRequest,
            response: {
                200: {}
            }
        }
    ],
    components: {
        authenticationRequest,
        authenticationResponse,
        greetRequest,
        greetResponse
    }
};

export { apiSpec };
