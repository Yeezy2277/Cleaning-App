import React from 'react';
import {TextInput, StyleSheet, Dimensions} from "react-native";

const width = Dimensions.get("screen").width;

const MyInput = (props) => {
    return (
        <TextInput style={props.width ? [styles.input, {width : props.width}] : props.height ? [styles.input, {height : props.height}] : [styles.input]} placeholder={props.placeholder} value={props.value} onFocus={props.onFocus} onBlur={props.onBlur} onChangeText={props.onChangeText}/>
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
        paddingLeft: width * 0.03,
        fontSize: width * 0.03
    }
})

export default MyInput;