import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from "../view/Common/MyTab";
import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, Image, View} from "react-native";
import CalculateRoot from "./Calculate";
import AddressesRoot from "./Addresses";
import SupportRoot from "./Support";
import AccountContainer from "./Account";
import calc1 from "../../assets/calc1.png";
import calc2 from "../../assets/calc2.png";
import location1 from "../../assets/loc1.png";
import location2 from "../../assets/loc2.png";
import support1 from "../../assets/support1.png";
import support2 from "../../assets/support2.png";
import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import Stack from "../LittleComponents/SVG/Stack";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const Tab = createBottomTabNavigator();

const AccountRoot = () => {
    return (
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Расчет') {
                        iconName = focused ? calc1 : calc2;
                    } else if (route.name === 'Адреса') {
                        iconName = focused ? location1 : location2;
                    } else if (route.name === "Помощь") {
                        iconName = focused ? support1 : support2;
                    } else if (route.name === "Аккаунт") {
                        iconName = focused ? profile1 : profile2;
                    }

                    return <View style={{paddingTop: 10}}>
                        <Image source={iconName} style={{width: 24, height: 24}}/>
                    </View>
                }
            })}>
                <Tab.Screen name="Расчет" options={{
                    title: ""
                }} component={CalculateRoot}/>
                <Tab.Screen name="Адреса" options={{
                    unmountOnBlur: true,
                    title: ""
                }} component={AddressesRoot}/>
                <Tab.Screen name="Помощь" options={{
                    title: ""
                }} component={SupportRoot}/>
                <Tab.Screen name="Аккаунт" options={{
                    title: ""
                }} component={AccountContainer}/>
            </Tab.Navigator>
    );
};

export default AccountRoot;
