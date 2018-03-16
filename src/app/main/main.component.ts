import { IComponentDefinition, ICityWeatherInfo, IRange, IOpenWeatherServerError } from '../../interfaces';
import { ApiServiceDefinition, ApiService, QueryServiceDefinition, QueryService } from "../shared";
import * as _ from 'lodash';

export class MainController {
    static $inject = ['$scope', ApiServiceDefinition.name, QueryServiceDefinition.name];

    public ready: boolean;
    public error: IOpenWeatherServerError;
    public temperatureRange: IRange;
    public humidityRange: IRange;

    private debouncedSortData = _.debounce(() => {
        this.sortData();
        this.$scope.$apply();
    }, 400);

    private itemsToShow = 6;

    private _targetTemperature: number = 21;
    public get targetTemperature() {
        return this._targetTemperature;
    }
    public set targetTemperature(value) {
        this._targetTemperature = value;
        this.debouncedSortData();
    }

    private _targetHumidity: number = 50;
    public get targetHumidity() {
        return this._targetHumidity;
    }
    public set targetHumidity(value) {
        this._targetHumidity = value;
        this.debouncedSortData();
    }

    private data: ICityWeatherInfo[] = [];
    public filteredData: ICityWeatherInfo[] = [];

    constructor(
        private $scope: ng.IScope,
        private apiService: ApiService,
        private queryService: QueryService
    ) { }

    private getWeatherData() {
        return this.apiService.getCityWeatherData();
    }

    private initRanges(data) {
        let ranges = this.queryService.getRanges(data);
        this.temperatureRange = ranges.temperatureRange;
        this.humidityRange = ranges.humidityRange;
    }

    private sortData() {
        this.filteredData = this.queryService.getCitiesByWeather(this.data, this.targetTemperature, this.targetHumidity, this.itemsToShow);
    }

    $onInit() {
        this.getWeatherData().then((data) => {
            this.data = data;
            this.initRanges(data);
            this.sortData();
            this.ready = true;
        }, (err) => {
            this.error = err;
        });
    }
}

export const MainComponent: IComponentDefinition = {
    name: 'appMain',
    options: {
        controller: MainController,
        controllerAs: 'vm',
        template: require('./main.html')
    }
};


