import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {createStackNavigator} from "@react-navigation/stack";

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const AddressesRoot = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerTitleContainerStyle: {
              paddingLeft: width * 0.018,
              paddingTop: width * 0.06
          },
          headerTitleStyle: {
              fontFamily: "Montserrat_500Medium",
              color: "white",
              fontSize: width * 0.06,
              justifyContent: "flex-end",
              alignSelf: "flex-start",
          },
          headerBackground: () => (
              <LinearGradient colors={["#3ad666", "#2eade8"]} start={[0, 1]}
                              end={[1, 0]}
                              style={[StyleSheet.absoluteFill, {paddingBottom: width * 0.25}]}>
              </LinearGradient>
          )
      }}>
          <Stack.Screen name="Ваши адреса" component={Addresses}/>
      </Stack.Navigator>
    );
};

const Addresses = () => {
    return <SafeAreaView>

    </SafeAreaView>
}

export default AddressesRoot;