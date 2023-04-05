import { Provider } from 'react-redux';
import Home from './home';
import store from '../store';

export default function Test() {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
}