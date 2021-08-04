import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import {Ionicons} from "@expo/vector-icons";

const width = Dimensions.get("screen").width;

export default function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;
                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? {selected: true} : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{flex: 1, alignItems: "center", justifyContent: "center"}}
                        >
                            {route.name === "Расчет" ?
                                <Ionicons name={isFocused ? "calculator" : "calculator-outline"} size={40} color={"#fff"}/>
                                : route.name === "Адреса" ? <Ionicons name={isFocused ? "location" : "location-outline"} size={40} color={"#fff"}/>
                                    : route.name === "Помощь" ? <Ionicons name={isFocused ? "headset" : "headset-outline"} size={40} color={"#fff"}/>
                                        : route.name === "Аккаунт" ? <Ionicons name={isFocused ? "person" : "person-outline"} size={40} color={"#fff"}/> : null}
                            <Text style={{color: '#fff', fontFamily: "Montserrat_500Medium"}}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}
