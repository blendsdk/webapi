import { IAPISpecification, IAPIComponent } from "@blendsdk/codekit";

const paramsRequestResponse: IAPIComponent = {
    q: { type: "number", optional: true },
    list: { type: "number", optional: true, array: true },
    flag: { type: "boolean", optional: true },
    amount: { type: "number", optional: true }
};

const testApiSpec: IAPISpecification = {
    application: "api",
    version: 1,
    endpoints: [
        {
            name: "params",
            method: "post",
            url: "/api/params/:q?",
            absoluteUrl: true,
            secure: false,
            request: paramsRequestResponse,
            controller: "testController",
            imports: [{ name: "testController", from: "./testController" }],
            response: {
                200: {}
            }
        }
    ],
    components: {
        paramsRequest: paramsRequestResponse
    }
};

export { testApiSpec };
