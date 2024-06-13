import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={(route) => ({
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 16,
                    paddingBottom: 10,
                },
                tabBarIconStyle: { display: "none" },

                tabBarStyle: {
                    backgroundColor: 'black',
                }
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
    )
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="HomeTabs" component={TabNavigator} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AppNavigator;
