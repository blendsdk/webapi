type COLUMN_NAME = "id" | "username" | "password";
type REST_METHOD_TYPE = "get" | "post" | "patch" | "delete";
type REST_PARAMETER_TYPE = "string" | "number" | "boolean";

interface IRESTInterface {
    method: REST_METHOD_TYPE;
    endpoint: string;
    input: {
        [name: string]: REST_PARAMETER_TYPE;
    };
}

const rest: IRESTInterface = {
    method: "post",
    endpoint: "/api/auth/login",
    input: {
        username: "string",
        password: "string"
    }
};
