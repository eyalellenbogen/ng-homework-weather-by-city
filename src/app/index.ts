import mainModule from './main';
import sharedModule from './shared';
import 'angular-material';
import 'angular-material/angular-material.min.css';
import './site.less';

const config = require('../../app-config.json');

const moduleName = 'appModule';

angular.module(moduleName, [mainModule, sharedModule, 'ngMaterial'])
    .constant('appConfig', config);

export default moduleName;
