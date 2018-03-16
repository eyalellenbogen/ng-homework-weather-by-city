import { IServiceDefinition } from '../../../../interfaces';
import { QueryService } from './query.service';

export const QueryServiceDefinition: IServiceDefinition = {
    name: '#query',
    service: QueryService
};

export { QueryService };