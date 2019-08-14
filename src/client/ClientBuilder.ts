import { IRoute, IRouteParameter } from "@blendsdk/express";
import { wrapInArray } from "@blendsdk/stdlib";
import { generateInterface, ITSInterfaceProperty } from "@blendsdk/codekit";
import {} from "@blendsdk/schemakit";
import { eDBColumnType } from "@blendsdk/schemakit/dist/database/Types";

function getClientMethodName(route: IRoute): string {
    return `client_${route.endpoint}`
        .replace(/\//gi, "_")
        .replace(/__/gi, "_")
        .toUpperCase();
}

function generateClientInterface(methodName: string, route: IRoute) {
    const columns: ITSInterfaceProperty[] = [];
    Object.keys(route.parameters).forEach(paramName => {
        const paramType = route.parameters[paramName].type;
        columns.push({
            name: paramName,
            type: paramType === "array" ? `string[]` : paramType
        });
    });
    return generateInterface(methodName, columns);
}

export function createClientAPI(routes: IRoute | IRoute[]) {
    wrapInArray<IRoute>(routes).forEach(route => {
        const methodName = getClientMethodName(route);
        console.log(generateClientInterface(methodName, route));
    });
}
