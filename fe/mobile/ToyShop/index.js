/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';

import DetailOrder from './views/detailOrder';
import { name as appName } from './app.json';
import rootComponents from './views/index';

AppRegistry.registerComponent(appName, () => rootComponents);
