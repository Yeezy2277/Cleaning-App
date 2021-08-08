import React from 'react';
import {TextInput, StyleSheet, Dimensions} from "react-native";

const width = Dimensions.get("screen").width;

const MyInput = (props, {navigation}) => {
    return (
        <TextInput
            style={props.width ? [styles.input, {width: props.width}] : props.height ? [styles.input, {height: props.height}] : props.alignSelf ? [styles.input, {alignSelf: props.alignSelf}] : [styles.input]}
            placeholder={props.placeholder} value={props.value} onFocus={props.onFocus} onBlur={props.onBlur}
            multiline={props.multiline}
            onChangeText={props.onChangeText} keyboardType={props.keyboardType}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: width * 0.85,
        height: width * 0.13,
        borderWidth: 2,
        borderColor: "#2eade8",
        borderRadius: 15,
        marginTop: width * 0.02,
        color: "#2eade8",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat_500Medium",
        paddingHorizontal: width * 0.03,
        fontSize: width * 0.03,
        backgroundColor: "#fff"
    }
})

export default MyInput;