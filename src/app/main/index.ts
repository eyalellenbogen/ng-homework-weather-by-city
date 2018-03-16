import './main.less';
import { MainComponent } from './main.component';
import { TemperatureTextFilter } from "./temperature-text";

const moduleName = 'mainModule';

angular.module(moduleName, [])
	.config(['$animateProvider', ($animateProvider) => {
		$animateProvider.classNameFilter(/angular-animate/);
	}])
	.component(MainComponent.name, MainComponent.options)
	.filter(TemperatureTextFilter.name, TemperatureTextFilter.factory);

export default moduleName;

