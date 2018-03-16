import { IComponentDefinition } from '../../../../interfaces';
import './spinner.less';
export const SpinnerComponent: IComponentDefinition = {
    name: 'appSpinner',
    options: {
        controller: () => { },
        template: require('./spinner.html'),
        transclude: true
    }
}