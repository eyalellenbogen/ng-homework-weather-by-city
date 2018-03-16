import sharedServices from './services';
import sharedComponents from './components';
export { QueryService, QueryServiceDefinition, ApiService, ApiServiceDefinition } from "./services";

const moduleName = 'sharedModule';
angular.module(moduleName, [sharedServices, sharedComponents]);

export default moduleName;
