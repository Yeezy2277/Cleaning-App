import React, {useContext} from 'react';
import {Dimensions, Text, TouchableOpacity, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const width = Dimensions.get("screen").width;

const MyButton = (props) => {
    return (
        <TouchableOpacity style={props.width ? [styles.button, {width: props.width}] : styles.button} disabled={props.disabled}
                          onPress={props.onPress}>
            <LinearGradient colors={["#3ad666", "#2eade8"]} start={[0, 1]}
                            style={styles.gradientButton}
                            end={[1, 0]}>
                <Text style={styles.textButton}>{props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: width * 0.05,
        width: width * 0.75,
        justifyContent: "center",
        textAlign: "center",
        alignSelf: "center"
    },
    gradientButton: {
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    textButton: {
        fontWeight: "500",
        fontSize: 20,
        color: "white"
    },
})

export default MyButton;
