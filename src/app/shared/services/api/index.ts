import { IServiceDefinition } from '../../../../interfaces';
import { ApiService } from './api.service';

export const ApiServiceDefinition: IServiceDefinition = {
    name: '#api',
    service: ApiService
};

export { ApiService };