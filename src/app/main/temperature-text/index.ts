import { IFilterDefinition } from "../../../interfaces";
import { TemperatureTextFilterFactory } from './temperature-text.filter';

export const TemperatureTextFilter: IFilterDefinition = {
    name: 'tempText',
    factory: TemperatureTextFilterFactory
};