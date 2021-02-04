import React from 'react';
import EStylesheet from 'react-native-extended-stylesheet';

import HomeScreen from '@screens/home';
import DirectoryScreen from '@screens/directory';
import TicketScreen from '@screens/ticket';
import MoreScreen from '@screens/favourite';
import MapScreen from '@screens/map';
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName: string;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Directory') {
                        iconName = focused ? 'folder' : 'folder-outline';
                    } else if (route.name === 'More') {
                        iconName = focused ? 'menu' : 'menu-outline';
                    } else {
                        //Profile
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    return <Icon name={iconName} size={22} color={color} />;
                },
            })}

            tabBarOptions={{
                activeTintColor: EStylesheet.value('$primary'),
                inactiveTintColor: EStylesheet.value('$text'),
                tabStyle: styles.tabStyle,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Directory" component={DirectoryScreen} />
            <Tab.Screen name="Favourite" component={MoreScreen} />
            <Tab.Screen name="More" component={TicketScreen} />
        </Tab.Navigator>
    );
};

const Stack = createStackNavigator();

const StackNav = () => (
    <Stack.Navigator>
        <Stack.Screen name="home" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="map" component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const styles = EStylesheet.create({
    tabStyle: {
        paddingVertical: 8,
    },
});

export default StackNav;
