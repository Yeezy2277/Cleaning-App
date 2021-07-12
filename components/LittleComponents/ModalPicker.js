import React from 'react';
import {Dimensions, TouchableOpacity, View, StyleSheet, FlatList, Text} from "react-native";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

const OPTIONS = ["проблема", "еще какая-то проблема"];
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;


const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option)
    }
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <TouchableOpacity onPress={() => props.changeModalVisibility(false)} style={styles.container}>
                <View style={styles.modal}>
                    <FlatList data={OPTIONS} renderItem={({item, index}) => (
                        <TouchableOpacity style={styles.option} key={index} onPress={() => onPressItem(item)}>
                            <Text style={styles.text}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}/>
                </View>
            </TouchableOpacity>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 15,
        width: width * 0.9,
        height: height * 0.8
    },
    option: {
        alignItems: "flex-start",
    },
    text: {
        margin: width * 0.05,
        fontFamily: "Montserrat_500Medium"
    }
})

export default ModalPicker;