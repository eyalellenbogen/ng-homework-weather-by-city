import { ICityWeatherInfo, IRange } from "../../../../interfaces";
import * as _ from "lodash";

class Range implements IRange {
    constructor(public min: number, public max: number) { }
    get range() {
        if (this.min === undefined || this.max === undefined) {
            return undefined;
        }
        return this.max - this.min;
    }
}

export class QueryService {

    private ranges: { temperatureRange: Range, humidityRange: Range };

    private setRanges(data: ICityWeatherInfo[]) {
        let tempRange: IRange = { max: 5, min: 5 };
        let humidRange: IRange = { max: 50, min: 50 };
        data.forEach(x => {
            tempRange.min = Math.min(x.temperature, tempRange.min);
            tempRange.max = Math.max(x.temperature, tempRange.max);
            humidRange.min = Math.min(x.humidity, humidRange.min);
            humidRange.max = Math.max(x.humidity, humidRange.max);
        });
        this.ranges = {
            temperatureRange: new Range(tempRange.min, tempRange.max),
            humidityRange: new Range(humidRange.min, humidRange.max)
        };
    }

    private setItemMatchScore(item: ICityWeatherInfo, targetTemp: number, targetHumidity: number) {
        let tMatch = 1 - Math.abs(item.temperature - targetTemp) / this.ranges.temperatureRange.range;
        let hMAtch = 1 - Math.abs(item.humidity - targetHumidity) / this.ranges.humidityRange.range;
        item.match = (tMatch + hMAtch) / 2;
    }

    private setMatchScore(data: ICityWeatherInfo[], targetTemp: number, targetHumidity: number) {
        if (!this.ranges) {
            this.setRanges(data);
        }
        data.forEach(x => {
            this.setItemMatchScore(x, targetTemp, targetHumidity);
        });
    }

    public getRanges(data: ICityWeatherInfo[]) {
        if (!this.ranges) {
            this.setRanges(data);
        }
        return this.ranges;
    }

    public getResults(data: ICityWeatherInfo[], targetTemp: number, targetHumidity: number, limit?: number) {
        if (!this.ranges) {
            this.setRanges(data);
        }
        this.setMatchScore(data, targetTemp, targetHumidity);
        let res = _(data).sortBy(x => 1 - x.match).take(limit || 10).value();
        return res;
    }
}

