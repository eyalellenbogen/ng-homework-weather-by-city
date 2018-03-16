import { ICityWeatherInfo } from "../../../../interfaces";

export class ApiService {
    static $inject = ['$http', '$q'];
    private boxQuery = 'box/city?bbox=-178,-48,178,48,10000';
    private apiUrl: string = '//api.openweathermap.org/data/2.5/';

    private apiKey = '3b0c40ab30f5f053c89cddb230852943';

    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
    }

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
            + '&appid=' + this.apiKey;

        let deferred = this.$q.defer<ICityWeatherInfo[]>();
        this.$http.get(url)
            .then(res => {
                let data = this.extractCityWeatherData((<any>res.data).list);
                deferred.resolve(data);
            });

        return deferred.promise;
    }

}