import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from "../Common/MyTab";
import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, View} from "react-native";
import CalculateRoot from "./Calculate";
import AddressesRoot from "./Addresses";
import SupportRoot from "./Support";
import AccountContainer from "./Account";
import UserProvider, {UserContext} from "../Common/UserProvider";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const Tab = createBottomTabNavigator();

const AccountRoot = () => {
    const [ state, dispatch ] = useContext(UserContext)
    useEffect(() => {
        console.warn(state.state);
        dispatch({type: "IS_NOT_SELECTED_MAP"})
    }, [])
    return (
        <UserProvider>
            <Tab.Navigator tabBar={(props) => {
                return (
                    <LinearGradient style={{height: height * 0.11, alignItems: "center", justifyContent: "center"}}
                                    colors={["#3ad666", "#2eade8"]}
                                    start={[0, 1]}
                                    end={[1, 0]}
                    >
                        <MyTabBar
                            {...props}
                            style={{backgroundColor: 'transparent'}}
                        />
                    </LinearGradient>
                );
            }}>
                <Tab.Screen name="Расчет" component={CalculateRoot}/>
                <Tab.Screen name="Адреса" component={AddressesRoot}/>
                <Tab.Screen name="Помощь" component={SupportRoot}/>
                <Tab.Screen name="Аккаунт" component={AccountContainer}/>
            </Tab.Navigator>
        </UserProvider>
    );
};

export default AccountRoot;