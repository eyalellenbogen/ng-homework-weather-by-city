export interface IComponentDefinition {
    name: string;
    options: ng.IComponentOptions;
}

export interface IServiceDefinition {
    name: string;
    service: Function;
}

export interface IFilterDefinition {
    name: string;
    factory: Function;
}

export interface ICityWeatherInfo {
    city: string;
    countryName: string;
    temperature: number;
    humidity: number;
    match?: number;
}

export interface IRange {
    min: number;
    max: number;
    range?: number;
}

export interface IAppConfig {
    openWeatherKey: string;
}

export interface IOpenWeatherServerError {
    status: number;
    statusText: string;
    data: {
        cod: number;
        message: string;
    }
}