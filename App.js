import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import {useEffect, useMemo, useReducer} from "react";
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./components/view/Auth/Login";
import {NavigationContainer} from "@react-navigation/native";
import AccountRoot from "./components/Account/AccountRoot";
import MyMapView from "./components/Account/Search/MyMapView";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import Code from "./components/view/Auth/Code";

const Stack = createStackNavigator();

const width = Dimensions.get("screen").width;

export const initialState = {
    isSetData: false,
    isLoading: true,
    isSignout: false,
    userToken: null,
    isNeedDelete: false,
    isBonus: false,
    id: null,
    timeCode: 0,
    isTime: false
}

export const AuthContext = React.createContext({
    state: initialState,
    dispatch: () => null,
});


export default function App({navigation}) {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                case 'UNSET_DATA_CALCULATOR': {
                    return {
                        ...prevState,
                        isSignout: false,
                        isSetData: false,
                        userToken: "dummy-auth-token",
                    }
                }
                case 'SET_DATA_CALCULATOR':
                    return {
                        ...prevState,
                        isSignout: false,
                        isSetData: true,
                        userToken: action.token,
                        id: action.id
                    }
                case "DELETE_INFO_FROM_CALCULATOR":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: "dummy-auth-token",
                        isNeedDelete: true
                    }
                case "CANCEL_DELETE_INFO_FROM_CALCULATOR":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: "dummy-auth-token",
                        isNeedDelete: false
                    }
                case "UPDATE_BONUS_BALANCE":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: "dummy-auth-token",
                        isBonus: true
                    }
                case "SET_TIME_CODE":
                    return {
                        ...prevState,
                        isSignout: false,
                        isTime: action.isTime
                    }
                case "SET_TIME_CODE_VALUE":
                    return {
                        ...prevState,
                        isSignout: false,
                        timeCode: action.timeCode
                    }
            }
        }, initialState
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync();
    }, []);

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            <NavigationContainer>
                {state.userToken == null ? (
                    <Stack.Navigator screenOptions={{
                        headerTitle: "",
                        headerBackTitle: "Назад",
                        headerTransparent: true
                    }}>
                        <Stack.Screen name="SignIn" component={Login}/>
                        <Stack.Screen name="Code" component={Code}/>
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator screenOptions={{
                        headerShown: true
                    }}>
                        <Stack.Screen name="Home" options={{
                            headerShown: false
                        }} component={AccountRoot}/>
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
