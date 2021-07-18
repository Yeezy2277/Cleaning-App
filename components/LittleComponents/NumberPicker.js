import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

const width = Dimensions.get("screen").width;

const NumberPicker = (props) => {
    const [value, setValue] = useState(props.start);
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{value} {props.text ? "м" : null}</Text>
                    {props.text ? <Text style={styles.sup}>2</Text> : null}
                </View>
                <View style={styles.pickerIcon}>
                    <TouchableOpacity style={styles.iconTopButton} onPress={() => {
                        setValue(value + props.step)
                    }}>
                        <Svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                             style={styles.iconTop}>
                            <Path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M0.645917 0.645978C0.692363 0.599415 0.747539 0.562472 0.808284 0.537265C0.869029 0.512059 0.93415 0.499084 0.999917 0.499084C1.06568 0.499084 1.13081 0.512059 1.19155 0.537265C1.2523 0.562472 1.30747 0.599415 1.35392 0.645978L6.99992 6.29298L12.6459 0.645978C12.6924 0.59949 12.7476 0.562614 12.8083 0.537455C12.8691 0.512296 12.9342 0.499346 12.9999 0.499346C13.0657 0.499346 13.1308 0.512296 13.1915 0.537455C13.2522 0.562614 13.3074 0.59949 13.3539 0.645978C13.4004 0.692466 13.4373 0.747655 13.4624 0.808394C13.4876 0.869134 13.5005 0.934234 13.5005 0.999978C13.5005 1.06572 13.4876 1.13082 13.4624 1.19156C13.4373 1.2523 13.4004 1.30749 13.3539 1.35398L7.35392 7.35398C7.30747 7.40054 7.2523 7.43748 7.19155 7.46269C7.13081 7.4879 7.06568 7.50087 6.99992 7.50087C6.93415 7.50087 6.86903 7.4879 6.80828 7.46269C6.74754 7.43748 6.69236 7.40054 6.64592 7.35398L0.645917 1.35398C0.599354 1.30753 0.562411 1.25236 0.537205 1.19161C0.511998 1.13087 0.499023 1.06575 0.499023 0.999978C0.499023 0.934211 0.511998 0.86909 0.537205 0.808344C0.562411 0.747599 0.599354 0.692424 0.645917 0.645978Z"
                                  fill="black"/>
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBottomButton} onPress={() => {
                        value !== props.start ? setValue(value - props.step) : null
                    }}>
                        <Svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                             style={styles.iconBottom}>
                            <Path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M0.645917 0.645978C0.692363 0.599415 0.747539 0.562472 0.808284 0.537265C0.869029 0.512059 0.93415 0.499084 0.999917 0.499084C1.06568 0.499084 1.13081 0.512059 1.19155 0.537265C1.2523 0.562472 1.30747 0.599415 1.35392 0.645978L6.99992 6.29298L12.6459 0.645978C12.6924 0.59949 12.7476 0.562614 12.8083 0.537455C12.8691 0.512296 12.9342 0.499346 12.9999 0.499346C13.0657 0.499346 13.1308 0.512296 13.1915 0.537455C13.2522 0.562614 13.3074 0.59949 13.3539 0.645978C13.4004 0.692466 13.4373 0.747655 13.4624 0.808394C13.4876 0.869134 13.5005 0.934234 13.5005 0.999978C13.5005 1.06572 13.4876 1.13082 13.4624 1.19156C13.4373 1.2523 13.4004 1.30749 13.3539 1.35398L7.35392 7.35398C7.30747 7.40054 7.2523 7.43748 7.19155 7.46269C7.13081 7.4879 7.06568 7.50087 6.99992 7.50087C6.93415 7.50087 6.86903 7.4879 6.80828 7.46269C6.74754 7.43748 6.69236 7.40054 6.64592 7.35398L0.645917 1.35398C0.599354 1.30753 0.562411 1.25236 0.537205 1.19161C0.511998 1.13087 0.499023 1.06575 0.499023 0.999978C0.499023 0.934211 0.511998 0.86909 0.537205 0.808344C0.562411 0.747599 0.599354 0.692424 0.645917 0.645978Z"
                                  fill="black"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.25,
        borderWidth: 2,
        borderColor: "#2eade8",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 15,
        height: width * 0.13,
        paddingLeft: width * 0.018,
        marginTop: width * 0.02
    },
    textContainer: {
        flexDirection: "row"
    },
    text: {
      fontFamily: "Montserrat_500Medium"
    },
    sup: {
        fontSize:10,
        lineHeight:15,
        textAlignVertical: 'top',
        fontFamily: "Montserrat_500Medium"
    },
    pickerIcon: {
        borderLeftWidth: 2,
        borderLeftColor: "#2eade8",
        height: width * 0.12,
        justifyContent: "center",
        alignItems: "center",
    },
    iconTopButton: {
        transform: [{ rotate: "180deg" }],
        paddingTop: 10,
        width: width * 0.05,
    },
    iconTop: {
        paddingRight: width * 0.05
    },
    iconBottomButton: {
        paddingTop: 10,
        borderTopWidth: 2,
        borderColor: "#2eade8",
        width: width * 0.08
    },
    iconBottom : {
        paddingLeft: width * 0.07
    }
})

export default NumberPicker;