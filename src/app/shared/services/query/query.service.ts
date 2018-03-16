import { ICityWeatherInfo, IRange } from "../../../../interfaces";
import * as _ from "lodash";

export class QueryService {

    private ranges: { temperatureRange: IRange, humidityRange: IRange };

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
            temperatureRange: { min: tempRange.min, max: tempRange.max, range: tempRange.max - tempRange.min },
            humidityRange: { min: humidRange.min, max: humidRange.max, range: humidRange.max - humidRange.min }
        };
    }

    private setItemMatchScore(item: ICityWeatherInfo, targetTemp: number, targetHumidity: number) {
        let tMatch = 1 - Math.abs(item.temperature - targetTemp) / this.ranges.temperatureRange.range;
        let hMatch = 1 - Math.abs(item.humidity - targetHumidity) / this.ranges.humidityRange.range;
        item.match = (tMatch + hMatch) / 2;
    }

    private scoreDataForMatching(data: ICityWeatherInfo[], targetTemp: number, targetHumidity: number) {
        data.forEach(x => this.setItemMatchScore(x, targetTemp, targetHumidity));
    }

    public getRanges(data: ICityWeatherInfo[]) {
        if (!this.ranges) {
            this.setRanges(data);
        }
        return this.ranges;
    }

    public getCitiesByWeather(data: ICityWeatherInfo[], targetTemp: number, targetHumidity: number, limit?: number) {
        if (!this.ranges) {
            throw 'Ranges weren\'t initiated. Run setRanges() before calling this.';
        }
        this.scoreDataForMatching(data, targetTemp, targetHumidity);
        let res = _(data).sortBy(x => 1 - x.match).take(limit || 10).value();
        return res;
    }
}

