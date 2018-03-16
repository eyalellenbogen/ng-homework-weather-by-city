import { SpinnerComponent } from "./spinner";

const moduleName = 'sharedComponent';
angular.module(moduleName, [])
    .component(SpinnerComponent.name, SpinnerComponent.options);

export default moduleName;