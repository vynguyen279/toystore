/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';

import Home from './views/home';
import Order from './views/order'
import { name as appName } from './app.json';
import rootComponents from './views/index';

AppRegistry.registerComponent(appName,() => rootComponents);
