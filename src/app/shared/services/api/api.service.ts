import { ICityWeatherInfo, IAppConfig, IOpenWeatherServerError } from "../../../../interfaces";

export class ApiService {
    static $inject = ['$http', '$q', 'appConfig'];
    private boxQuery = 'box/city?bbox=-178,-48,178,48,10000';
    private apiUrl: string = '//api.openweathermap.org/data/2.5/';

    constructor(private $http: ng.IHttpService, private $q: ng.IQService, private appConfig: IAppConfig) { }

    private extractCityWeatherData(res: any): ICityWeatherInfo[] {
        return res.map(x => {
            return {
                city: x.name,
                temperature: x.main.temp,
                humidity: x.main.humidity
            } as ICityWeatherInfo;
        });
    }

    getCityWeatherData(): ng.IPromise<ICityWeatherInfo[]> {
        let url = this.apiUrl
            + this.boxQuery
            + '&appid=' + this.appConfig.openWeatherKey;

        let deferred = this.$q.defer<ICityWeatherInfo[]>();
        this.$http.get(url)
            .then(res => {
                let data = this.extractCityWeatherData((<any>res.data).list);
                deferred.resolve(data);
            }, (err: IOpenWeatherServerError) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

}