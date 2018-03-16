import { ApiServiceDefinition } from "./api";
import { QueryServiceDefinition } from "./query";


const moduleName = 'sharedServices';
angular.module(moduleName, [])
    .service(QueryServiceDefinition.name, QueryServiceDefinition.service)
    .service(ApiServiceDefinition.name, ApiServiceDefinition.service);

export default moduleName;
export { QueryService, QueryServiceDefinition } from './query';
export { ApiService, ApiServiceDefinition } from './api'
