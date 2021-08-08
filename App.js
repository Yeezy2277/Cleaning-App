import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import {useEffect, useMemo, useReducer} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./components/Auth/Login";
import {NavigationContainer} from "@react-navigation/native";
import AccountRoot from "./components/Account/AccountRoot";
import MyMapView from "./components/Account/Search/MyMapView";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";

const Stack = createStackNavigator();

const width = Dimensions.get("screen").width;

export const AuthContext = React.createContext();

export default function App({ navigation }) {
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
        }
      },
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
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

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
      () => ({
        signIn: async data => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `SecureStore`
          // In the example, we'll use a dummy token

          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async data => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `SecureStore`
          // In the example, we'll use a dummy token

          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
      }),
      []
  );

  return (
      <AuthContext.Provider value={authContext}>
          <NavigationContainer>
                  {state.userToken == null ? (
                      <Stack.Navigator screenOptions={{
                          headerShown: false
                      }}>
                      <Stack.Screen name="SignIn" component={Login} />
                      </Stack.Navigator>
                  ) : (
                      <Stack.Navigator screenOptions={{
                          headerShown: false
                      }}>
                      <Stack.Screen name="Home" component={AccountRoot} />
                          <Stack.Screen options={{
                              headerShown: true,
                              headerLeft: () => null,
                              headerTitleStyle: {
                                  fontFamily: "Montserrat_500Medium",
                                  justifyContent: "flex-end",
                                  alignSelf: "flex-start",
                                  color: "white",
                                  fontSize: width * 0.06
                              },
                              headerBackground: () => (
                                  <LinearGradient colors={["#3ad666", "#2eade8"]} start={[0, 1]}
                                                  end={[1, 0]}
                                                  style={StyleSheet.absoluteFill}>
                                  </LinearGradient>
                              )
                          }} name="Карта" component={MyMapView}/>
                      </Stack.Navigator>
                  )}
          </NavigationContainer>
      </AuthContext.Provider>
  );
}