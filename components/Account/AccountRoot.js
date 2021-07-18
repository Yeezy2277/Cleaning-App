import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calculate from "./Calculate";
import Addresses from "./Addresses";
import Support from "./Support";
import Account from "./Account";
import MyTabBar from "../Common/MyTab";
import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, View} from "react-native";
import CalculateRoot from "./Calculate";
import AddressesRoot from "./Addresses";
import SupportRoot from "./Support";
import AccountContainer from "./Account";

const height = Dimensions.get("screen").height;

const Tab = createBottomTabNavigator();

const AccountRoot = () => {
    return (
        <Tab.Navigator tabBar={(props) => {
            return (
                <LinearGradient style={{height: height * 0.11, alignItems: "center", justifyContent: "center"}}
                    colors={["#3ad666", "#2eade8"]}
                    start={[0, 1]}
                    end={[1, 0]}
                >
                    <MyTabBar
                        {...props}
                        style={{ backgroundColor: 'transparent' }}
                    />
                </LinearGradient>
            );
        }}>
            <Tab.Screen name="Расчет" component={CalculateRoot}/>
            <Tab.Screen name="Адреса" component={AddressesRoot}/>
            <Tab.Screen name="Помощь" component={SupportRoot}/>
            <Tab.Screen name="Аккаунт" component={AccountContainer}/>
        </Tab.Navigator>
    );
};

export default AccountRoot;