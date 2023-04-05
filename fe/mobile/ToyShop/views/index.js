import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Welcome from './welcome';
import Login from './login';
import Register from './register';
import Information from './information';
import AccountUser from './account';
import FixInf from './fixInf';
import ChangePass from './changePass';
import GetPass from './getPass';
import Home from './home';
import CateGory from './cateGory';
import AllProduct from './allProduct';
import DetailPro from './detailProduct';
import ShopCart from './shopCart';
import { Cart } from '../components'
import { Provider } from 'react-redux';
import store from '../store';
import Color from '../res/color';

const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Trang chủ"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60 },
                tabBarActiveTintColor: Color.primary,
                tabBarInactiveTintColor: Color.btn,
                tabBarLabelStyle: { fontSize: 12,fontWeight: '700' },
            }}
        >
            <Tab.Screen
                name="Trang chủ"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            size={30}
                            name="home"
                            style={{
                                color: focused? Color.primary:Color.btn,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Danh mục"
                component={CateGory}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            size={30}
                            name="list"
                            style={{
                                color: focused? Color.primary:Color.btn,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Tài khoản"
                component={AccountUser}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            size={30}
                            name="user"
                            style={{
                                color: focused? Color.primary:Color.btn,
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

class ShoppingCart extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <NavigationContainer >
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="AllProduct" component={AllProduct} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

function rootComponents() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="GetPass" component={GetPass} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Information" component={Information} />
                    <Stack.Screen name="MyTabs" component={MyTabs} />
                    <Stack.Screen name="AllProduct" component={AllProduct} />
                    <Stack.Screen name="ShopCart" component={ShopCart} />
                    <Stack.Screen name="FixInf" component={FixInf} />
                    <Stack.Screen name="ChangePass" component={ChangePass} />
                    <Stack.Screen name="DetailPro" component={DetailPro} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
export default rootComponents;
